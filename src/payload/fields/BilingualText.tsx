"use client";

import type { StaticDescription, TextareaFieldClientComponent, TextFieldClientComponent } from "payload";
import { FieldDescription, FieldError, useField, useFormInitializing, useTranslation } from "@payloadcms/ui";
import { getTranslation } from "@payloadcms/translations";
import { type ChangeEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { copyArPath, copyBaseFromPath, copyEnPath } from "./copyPaths";

type SharedProps = {
  path: string;
  field: {
    name?: string;
    label?: unknown;
    type: "text" | "textarea";
    required?: boolean;
    admin?: {
      description?: unknown;
      placeholder?: string;
      readOnly?: boolean;
    };
  };
  readOnly?: boolean;
};

function labelForLocale(baseLabel: string, code: Locale, arUi: boolean) {
  if (arUi) {
    return code === "ar" ? `${baseLabel} بالعربية` : `${baseLabel} بالإنجليزية`;
  }
  return code === "en" ? `${baseLabel} in English` : `${baseLabel} in Arabic`;
}

function BilingualInput({
  path: pathFromProps,
  field,
  readOnly: readOnlyProp,
  multiline,
}: SharedProps & { multiline: boolean }) {
  const { i18n } = useTranslation();
  const initializing = useFormInitializing();
  const arUi = i18n.language?.startsWith("ar");

  const base = copyBaseFromPath(pathFromProps);
  const pathEn = copyEnPath(base);
  const pathAr = copyArPath(base);

  const enField = useField<string>({ path: pathEn });
  const arField = useField<string>({ path: pathAr });

  const baseLabel = String(
    getTranslation(field.label as Parameters<typeof getTranslation>[0], i18n) ?? field.name ?? base,
  );
  const inputDisabled = readOnlyProp || field.admin?.readOnly || initializing || enField.formProcessing;

  const renderInput = (code: Locale, path: string, value: string | undefined, setValue: (v: string) => void) => {
    const title = labelForLocale(baseLabel, code, arUi);
    const common = {
      className: "vx-bilingual-field__control",
      dir: (code === "ar" ? "rtl" : "ltr") as "rtl" | "ltr",
      disabled: inputDisabled,
      id: `${path}-${code}`,
      name: path,
      placeholder: field.admin?.placeholder,
      value: value ?? "",
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
      },
    };

    return (
      <div key={code} className="vx-bilingual-field__row">
        <label className="vx-bilingual-field__label" htmlFor={common.id}>
          {title}
          {field.required ? <span className="vx-bilingual-field__req"> *</span> : null}
        </label>
        {multiline ? <textarea {...common} rows={4} /> : <input {...common} type="text" />}
      </div>
    );
  };

  return (
    <div className="vx-bilingual-field" data-vx-bilingual-path={base}>
      {field.admin?.description ? (
        <FieldDescription description={field.admin.description as StaticDescription} path={base} />
      ) : null}
      <div className="vx-bilingual-field__stack">
        {arUi ? (
          <>
            {renderInput("ar", pathAr, arField.value, arField.setValue)}
            {renderInput("en", pathEn, enField.value, enField.setValue)}
          </>
        ) : (
          <>
            {renderInput("en", pathEn, enField.value, enField.setValue)}
            {renderInput("ar", pathAr, arField.value, arField.setValue)}
          </>
        )}
      </div>
      {enField.showError ? <FieldError path={pathEn} showError={enField.showError} /> : null}
      {arField.showError ? <FieldError path={pathAr} showError={arField.showError} /> : null}
    </div>
  );
}

export const BilingualText: TextFieldClientComponent = (props) => (
  <BilingualInput path={props.path} field={props.field as SharedProps["field"]} readOnly={props.readOnly} multiline={false} />
);

export const BilingualTextarea: TextareaFieldClientComponent = (props) => (
  <BilingualInput path={props.path} field={props.field as SharedProps["field"]} readOnly={props.readOnly} multiline />
);
