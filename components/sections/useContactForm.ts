"use client";

import { useCallback, useState, type FormEvent } from "react";

import { submit } from "@/services/contact";
import { copy } from "@/lib/i18n";
import type { ContactPayload, ProjectType } from "@/types/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormErrors = Partial<Record<keyof ContactPayload, string>>;

const initialPayload: ContactPayload = {
  name: "",
  email: "",
  company: "",
  projectType: "brand",
  message: "",
};

const validate = (payload: ContactPayload): FormErrors => {
  const errors: FormErrors = {};
  if (payload.name.trim().length < 2) errors.name = copy.contato.form.required;
  if (!/.+@.+\..+/.test(payload.email)) errors.email = copy.contato.form.invalidEmail;
  if (payload.message.trim().length < 5) errors.message = copy.contato.form.required;
  return errors;
};

export function useContactForm() {
  const [payload, setPayload] = useState<ContactPayload>(initialPayload);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const setField = useCallback(
    <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
      setPayload((p) => ({ ...p, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    },
    [],
  );

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const next = validate(payload);
      setErrors(next);
      if (Object.keys(next).length > 0) return;

      setStatus("submitting");
      const result = await submit(payload);
      setStatus(result.status === "success" ? "success" : "error");
    },
    [payload],
  );

  const projectTypes: Array<{ value: ProjectType; label: string }> = [
    { value: "brand", label: copy.contato.form.types.brand },
    { value: "commercial", label: copy.contato.form.types.commercial },
    { value: "fashion", label: copy.contato.form.types.fashion },
    { value: "music", label: copy.contato.form.types.music },
    { value: "documentary", label: copy.contato.form.types.documentary },
    { value: "other", label: copy.contato.form.types.other },
  ];

  const reset = useCallback(() => {
    setPayload(initialPayload);
    setErrors({});
    setStatus("idle");
  }, []);

  return {
    payload,
    errors,
    status,
    projectTypes,
    setField,
    onSubmit,
    reset,
  };
}
