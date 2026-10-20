import { toast } from "sonner";
import { flushBilingualFieldsFromDom } from "./bilingualDomFlush";

export type DocumentSubmit = (options?: {
  overrides?: Record<string, unknown>;
}) => Promise<unknown>;

type FieldFlusher = () => Promise<void>;

const fieldFlushers = new Map<string, FieldFlusher>();
let documentSubmit: DocumentSubmit | null = null;
let saveInFlight = false;
let saveInterceptInstalled = false;

export function registerDocumentSubmit(submit: DocumentSubmit) {
  documentSubmit = submit;
}

export function registerBilingualFieldFlusher(path: string, flusher: FieldFlusher) {
  fieldFlushers.set(path, flusher);
  return () => {
    if (fieldFlushers.get(path) === flusher) fieldFlushers.delete(path);
  };
}

async function flushRegisteredFields() {
  if (fieldFlushers.size === 0) return;

  const errors: unknown[] = [];
  for (const flusher of fieldFlushers.values()) {
    try {
      await flusher();
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}

/**
 * Intercept Save before Payload's handler so bilingual PATCH always runs first.
 * Installed when the first bilingual field mounts (does not depend on custom SaveButton).
 */
export function ensureBilingualSaveIntercept() {
  if (saveInterceptInstalled || typeof document === "undefined") return;
  saveInterceptInstalled = true;

  document.addEventListener(
    "mousedown",
    (event) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest("#action-save");
      if (!button || button.closest(".form-submit") == null) return;
      if (button instanceof HTMLButtonElement && button.disabled) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      void saveDocumentWithBilingualFlush().catch(() => undefined);
    },
    true,
  );
}

export async function saveDocumentWithBilingualFlush(submitArg?: DocumentSubmit) {
  if (saveInFlight) return;
  const submit = submitArg ?? documentSubmit;
  if (!submit) {
    throw new Error("Document form is not ready");
  }

  saveInFlight = true;
  try {
    const flushedFromDom = await flushBilingualFieldsFromDom();
    if (!flushedFromDom) {
      await flushRegisteredFields();
    }
    await submit();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed";
    toast.error(message);
    throw error;
  } finally {
    saveInFlight = false;
  }
}
