import type { ContactPayload, ContactResult } from "@/types/contact";
import { getAttribution } from "@/lib/attribution";

type Submitter = (
  input: ContactPayload & { attribution?: ReturnType<typeof getAttribution> },
) => Promise<unknown>;

export async function submit(
  payload: ContactPayload,
  submitter: Submitter,
): Promise<ContactResult> {
  const valid =
    payload.name.trim().length > 1 &&
    /.+@.+\..+/.test(payload.email) &&
    payload.message.trim().length > 4;

  if (!valid) {
    return { status: "error", reason: "validation" };
  }

  try {
    const attribution = getAttribution();
    await submitter({
      ...payload,
      attribution: Object.keys(attribution).length > 0 ? attribution : undefined,
    });
    return { status: "success" };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[contact:submit] failed", err);
    }
    return { status: "error", reason: "network" };
  }
}
