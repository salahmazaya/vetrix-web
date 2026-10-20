"use client";

import { FormSubmit, useFormModified, useHotkey, useTranslation } from "@payloadcms/ui";
import { useDocumentInfo } from "@payloadcms/ui/providers/DocumentInfo";
import { useEditDepth } from "@payloadcms/ui/providers/EditDepth";
import { useOperation } from "@payloadcms/ui/providers/Operation";
import { useRef } from "react";
export function BilingualSaveButton({ label: labelProp }: { label?: string }) {
  const { uploadStatus } = useDocumentInfo();
  const { t } = useTranslation();
  const modified = useFormModified();
  const label = labelProp || t("general:save");
  const ref = useRef<HTMLButtonElement>(null);
  const editDepth = useEditDepth();
  const operation = useOperation();
  const disabled = (operation === "update" && !modified) || uploadStatus === "uploading";

  useHotkey({ cmdCtrlKey: true, editDepth, keyCodes: ["s"] }, (event) => {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    ref.current?.click();
  });

  return (
    <FormSubmit
      buttonId="action-save"
      disabled={disabled}
      ref={ref}
      size="medium"
      type="button"
    >
      {label}
    </FormSubmit>
  );
}
