"use client";

import { useForm } from "@payloadcms/ui";
import { useEffect } from "react";
import { registerDocumentSubmit } from "@/payload/fields/bilingualSaveCoordinator";

/** Keeps document `submit` registered (e.g. for keyboard save). */
export function BilingualFormSaveHook() {
  const { submit } = useForm();

  useEffect(() => {
    registerDocumentSubmit(submit);
  }, [submit]);

  return null;
}
