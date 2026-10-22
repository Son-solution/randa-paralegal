/**
 * DEMO document handling.
 *
 * Files are checked in the browser only. Just the metadata (name, type, size)
 * is kept in memory to show the list – the file content is never read,
 * uploaded, transmitted or stored.
 */
import { uploads } from "@/config/booking";

export type FileMeta = { id: string; name: string; ext: string; size: number };
export type FileError = { name: string; msg: string };

export function sizeLabel(b: number): string {
  if (b < 1024 * 1024) return Math.max(1, Math.round(b / 1024)) + " KB";
  return (b / 1024 / 1024).toFixed(1).replace(".", ",") + " MB";
}

const MAX_MB = Math.round(uploads.maxBytes / 1024 / 1024);

export function addFileMeta(
  current: FileMeta[],
  incoming: ArrayLike<{ name: string; size: number }>,
): { files: FileMeta[]; errors: FileError[]; added: number } {
  const files = current.slice();
  const errors: FileError[] = [];
  let added = 0;
  const allowed: readonly string[] = uploads.extensions;
  Array.from(incoming).forEach((f) => {
    const name = String(f.name || "Datei");
    const ext = (name.split(".").pop() || "").toLowerCase();
    if (!allowed.includes(ext)) {
      errors.push({ name, msg: "Dateityp nicht unterstützt (erlaubt: PDF, JPG, PNG, HEIC)." });
      return;
    }
    if (f.size > uploads.maxBytes) {
      errors.push({ name, msg: "Datei ist grösser als " + MAX_MB + " MB (" + sizeLabel(f.size) + ")." });
      return;
    }
    if (f.size === 0) {
      errors.push({ name, msg: "Die Datei ist leer." });
      return;
    }
    if (files.some((x) => x.name === name && x.size === f.size)) {
      errors.push({ name, msg: "Diese Datei ist bereits ausgewählt." });
      return;
    }
    if (files.length >= uploads.maxFiles) {
      errors.push({ name, msg: "Maximal " + uploads.maxFiles + " Dateien möglich." });
      return;
    }
    files.push({
      id: "f" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      name,
      ext: ext.toUpperCase().slice(0, 4),
      size: f.size,
    });
    added++;
  });
  return { files, errors, added };
}
