import type { ContactPayload, ContactResult } from "@/types/contact";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function submit(payload: ContactPayload): Promise<ContactResult> {
  await delay(900);

  const valid =
    payload.name.trim().length > 1 &&
    /.+@.+\..+/.test(payload.email) &&
    payload.message.trim().length > 4;

  if (!valid) {
    return { status: "error", reason: "validation" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact:submit:mock]", payload);
  }

  return { status: "success" };
}
