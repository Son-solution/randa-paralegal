/**
 * What the intake form sends to /api/anfrage, and how the server reads it back.
 *
 * The server never trusts the shape it receives: every field is rebuilt from
 * initialState(), only known keys are copied, strings are trimmed to a maximum
 * length and booleans are coerced. Files are never sent (see uploads.enabled).
 */
import { initialState, type FormData } from "./state";

/** Longest accepted text per field (the longest textarea allows 1500 characters). */
const MAX_LEN = 2000;

export type Payload = Omit<FormData, "files">;

/** Groups copied 1:1 (all string fields, plus the checkbox maps inside "a" and "y"). */
const GROUPS = ["services", "c", "a", "y", "i", "u", "b", "consent"] as const;

export function toPayload(s: FormData): Payload {
  const out = {} as Record<string, unknown>;
  GROUPS.forEach((g) => {
    out[g] = s[g];
  });
  return out as Payload;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Copies `input` onto the shape of `template`, keeping only keys and value types the template knows. */
function sanitize<T>(template: T, input: unknown): T {
  if (!isObj(template) || !isObj(input)) return template;
  const out = { ...template } as Record<string, unknown>;
  for (const k of Object.keys(template)) {
    const t = (template as Record<string, unknown>)[k];
    const v = input[k];
    if (typeof t === "string") out[k] = typeof v === "string" ? v.slice(0, MAX_LEN) : t;
    else if (typeof t === "boolean") out[k] = v === true;
    else if (typeof t === "number") out[k] = typeof v === "number" && Number.isFinite(v) ? v : t;
    else if (isObj(t) && Object.keys(t).length) out[k] = sanitize(t, v);
    // Empty objects are checkbox maps ({ formular: true, … }): keep only short keys set to true.
    else if (isObj(t) && isObj(v)) out[k] = Object.fromEntries(Object.keys(v).filter((x) => x.length <= 40 && v[x] === true).slice(0, 20).map((x) => [x, true]));
  }
  return out as T;
}

/** Rebuilds the form data from an untrusted request body (null when it is not an object). */
export function fromPayload(body: unknown): FormData | null {
  if (!isObj(body)) return null;
  const base = initialState();
  const data = { files: [] } as unknown as FormData;
  GROUPS.forEach((g) => {
    (data as Record<string, unknown>)[g] = sanitize(base[g], body[g]);
  });
  return data;
}
