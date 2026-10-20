"use client";

import type { UploadFieldClientComponent } from "payload";
import {
  BulkUploadProvider,
  Button,
  Dropzone,
  FieldDescription,
  FieldError,
  FieldLabel,
  UploadField,
  useBulkUpload,
  useConfig,
  useDocumentDrawer,
  useField,
  useModal,
  useTranslation,
  withCondition,
} from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import * as qs from "qs-esm";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ComponentProps } from "react";

import { MediaGalleryModal, type MediaPick } from "./MediaGalleryModal";

type UploadProps = ComponentProps<UploadFieldClientComponent>;

function isMediaField(relationTo: unknown, hasMany?: boolean | null) {
  if (hasMany) return false;
  if (relationTo === "media") return true;
  return Array.isArray(relationTo) && relationTo.length === 1 && relationTo[0] === "media";
}

function previewSrc(doc: MediaPick, serverURL: string) {
  const raw = doc.thumbnailURL || doc.url;
  if (raw) {
    try {
      return new URL(raw, serverURL).toString();
    } catch {
      return `${serverURL}${raw}`;
    }
  }
  if (doc.filename) return `/media/${doc.filename}`;
  return null;
}

function VetrixUploadFieldInner(props: UploadProps) {
  const relationTo = props.field.relationTo;
  const hasMany = props.field.hasMany;
  if (!isMediaField(relationTo, hasMany)) {
    return <UploadField {...props} />;
  }
  return <MediaSingleUpload {...props} />;
}

/** Routes media uploads through the custom gallery; everything else stays default. */
export const VetrixUploadField = withCondition(VetrixUploadFieldInner);

function MediaSingleUpload(props: UploadProps) {
  const {
    field,
    field: {
      admin: { allowCreate, className, description } = {},
      label,
      localized,
      relationTo,
      required,
    },
    path: pathFromProps,
    readOnly,
    validate,
  } = props;

  const { config } = useConfig();
  const { i18n, t } = useTranslation();
  const ar = Boolean(i18n.language?.startsWith("ar"));
  const { openModal } = useModal();
  const gallerySlug = useMemo(() => `vx-media-gallery-${pathFromProps.replace(/\./g, "-")}`, [pathFromProps]);
  const uuid = useId();

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField({
    potentiallyStalePath: pathFromProps,
    validate: validate as never,
  });

  const [populated, setPopulated] = useState<MediaPick | null>(null);
  const loadedRef = useRef<unknown>(null);

  const relation = typeof relationTo === "string" ? relationTo : "media";

  const populate = useCallback(
    async (id: number | string) => {
      const body = qs.stringify({
        depth: 0,
        draft: true,
        limit: 1,
        locale: ar ? "ar" : "en",
        where: { id: { equals: id } },
      });
      const res = await fetch(formatAdminURL({ apiRoute: config.routes.api, path: `/${relation}` }), {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept-Language": i18n.language,
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Payload-HTTP-Method-Override": "GET",
        },
        body,
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { docs: MediaPick[] };
      return data.docs[0] ?? null;
    },
    [ar, config.routes.api, i18n.language, relation],
  );

  useEffect(() => {
    if (loadedRef.current === value) return;
    loadedRef.current = value;
    if (value == null || value === "") {
      setPopulated(null);
      return;
    }
    const id = typeof value === "object" && value && "value" in value ? (value as { value: unknown }).value : value;
    if (typeof id !== "string" && typeof id !== "number") return;
    void populate(id).then((doc) => setPopulated(doc));
  }, [value, populate]);

  const {
    drawerSlug: bulkSlug,
    setCollectionSlug,
    setInitialFiles,
    setOnSuccess,
    setSelectableCollections,
  } = useBulkUpload();

  const [CreateDocDrawer, , { openDrawer: openCreateDocDrawer }] = useDocumentDrawer({
    collectionSlug: relation,
  });

  const onUploadSuccess = useCallback(
    (forms: { collectionSlug: string; doc: { id?: number | string } }[]) => {
      const first = forms[0];
      if (first?.doc?.id == null) return;
      setValue(first.doc.id);
      void populate(first.doc.id).then((doc) => setPopulated(doc));
    },
    [populate, setValue],
  );

  useEffect(() => {
    setOnSuccess(onUploadSuccess);
  }, [onUploadSuccess, setOnSuccess]);

  const onLocalFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setCollectionSlug(relation);
    setSelectableCollections([relation]);
    setInitialFiles(fileList);
    openModal(bulkSlug);
  };

  const onGalleryPick = (doc: MediaPick) => {
    setValue(doc.id);
    setPopulated(doc);
  };

  const clear = () => {
    setValue(null);
    setPopulated(null);
  };

  const ro = readOnly || disabled;
  const showDropzone = !value;
  const src = populated ? previewSrc(populated, config.serverURL) : null;
  const title =
    populated?.alt_en?.trim() ||
    populated?.alt?.trim() ||
    populated?.filename ||
    (populated ? `#${populated.id}` : "");

  return (
    <BulkUploadProvider drawerSlugPrefix={`${pathFromProps}-${uuid}`}>
      <div
        className={["field-type", "upload", "vx-upload", className, showError && "error", ro && "read-only"].filter(Boolean).join(" ")}
        id={`field-${path?.replace(/\./g, "__")}`}
      >
        {Label ?? <FieldLabel label={label} localized={localized} path={path} required={required} />}
        <div className="upload__wrap">{Error ?? <FieldError path={path} showError={showError} />}</div>
        {BeforeInput}

        <div className="upload__dropzoneAndUpload">
          {!showDropzone && populated ? (
            <div className="vx-upload-preview">
              <div className="vx-upload-preview__media">{src ? <img src={src} alt="" /> : <span className="vx-gallery__ph" />}</div>
              <div className="vx-upload-preview__copy">
                <strong>{title}</strong>
                {populated.filename ? <span>{populated.filename}</span> : null}
              </div>
              {!ro ? (
                <button type="button" className="vx-upload-preview__remove" onClick={clear}>
                  {ar ? "إزالة" : "Remove"}
                </button>
              ) : null}
            </div>
          ) : null}

          {showDropzone ? (
            <Dropzone disabled={ro} onChange={onLocalFiles}>
              <div className="upload__dropzoneContent vx-upload__dropzone">
                <div className="upload__dropzoneContent__buttons">
                  {allowCreate !== false && !ro ? (
                    <>
                      <Button buttonStyle="pill" className="upload__createNewToggler" onClick={() => openCreateDocDrawer()} size="small">
                        {t("general:createNew")}
                      </Button>
                      <span className="upload__dropzoneContent__orText">{t("general:or")}</span>
                    </>
                  ) : null}
                  <Button
                    buttonStyle="pill"
                    className="upload__listToggler vx-gallery-open"
                    disabled={ro}
                    onClick={() => openModal(gallerySlug)}
                    size="small"
                  >
                    {t("fields:chooseFromExisting")}
                  </Button>
                  <CreateDocDrawer
                    onSave={(data) => {
                      if (data.doc?.id != null) {
                        setValue(data.doc.id);
                        setPopulated(data.doc as MediaPick);
                      }
                    }}
                  />
                  <MediaGalleryModal modalSlug={gallerySlug} onSelect={onGalleryPick} />
                </div>
                {allowCreate !== false && !ro ? (
                  <p className="upload__dragAndDropText">
                    {t("general:or")} {t("upload:dragAndDrop")}
                  </p>
                ) : null}
              </div>
            </Dropzone>
          ) : null}
        </div>

        {AfterInput}
        {Description ?? <FieldDescription description={description} path={path} />}
      </div>
    </BulkUploadProvider>
  );
}
