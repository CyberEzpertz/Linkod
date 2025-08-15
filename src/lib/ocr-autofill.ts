/**
 * Utility to fetch the latest OCR data from sessionStorage for kiosk autofill.
 * Returns null if not available or on error.
 */
export interface OcrData {
  name?: string;
  dob?: string;
  licenseNumber?: string;
  address?: string;
  expires?: string;
}

/**
 * Parses a name in the format "SURNAME, FIRST NAMES MIDDLE NAME"
 * Returns { surname, firstName, middleName }
 */
export function parseOcrName(ocrName: string): { surname: string; firstName: string; middleName: string } {
  if (!ocrName) return { surname: "", firstName: "", middleName: "" };
  const [surnamePart, rest] = ocrName.split(",", 2).map(s => s.trim());
  if (!rest) return { surname: surnamePart || "", firstName: "", middleName: "" };
  const nameParts = rest.split(/\s+/);
  const firstName = nameParts[0] || "";
  const middleName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
  return { surname: surnamePart, firstName, middleName };
}

export function getLatestOcrData(): OcrData | null {
  if (typeof window === "undefined") return null;
  try {
    const extraDocs = JSON.parse(
      sessionStorage.getItem("extraDocuments") || "[]"
    );
    const doc = [...extraDocs]
      .reverse()
      .find(
        (d: any) =>
          d.type === "ID Card" &&
          d.name &&
          d.name.toLowerCase().includes("driver") &&
          d.ocr &&
          typeof d.ocr === "object"
      );
    return doc?.ocr || null;
  } catch {
    return null;
  }
}