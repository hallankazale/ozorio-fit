/** Extrai séries, repetições ou tempo sem alterar a ficha original. */
export function readWorkoutPrescription(prescription: string): { sets: string; reps: string } {
  const normalized = prescription.trim();
  const match = normalized.match(/^(\d+)\s*[x×]\s*(.+)$/i);
  if (match) return { sets: match[1], reps: match[2].trim() };
  return { sets: "—", reps: normalized || "—" };
}
