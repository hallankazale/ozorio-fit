import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import { curatedWorkoutGif } from "../data/exerciseDemonstrations";
import type { WorkoutExercise } from "../services/workoutService";

type Props = { exercise: WorkoutExercise; compact?: boolean };

/**
 * TODO para exercícios não catalogados: registrar o movimento e equipamento corretos.
 * Nunca mostramos foto real, vídeo de outra pessoa ou GIF de máquina errada
 * apenas para preencher o espaço: a modalidade visual escolhida é anatômica.
 */
export function WorkoutDemonstration({ exercise, compact = false }: Props) {
  const curated = curatedWorkoutGif(exercise.name);
  const trustedExistingGif = exercise.media_type === "gif" &&
    /^https:\/\/cdn\.jsdelivr\.net\/gh\/JahelCuadrado\/ExerciseGymGifsDB@v1\.1\.0\/[a-z-]+\/[a-z0-9-]+\.gif$/.test(exercise.media_url || "")
      ? exercise.media_url : null;
  const url = curated ?? trustedExistingGif;
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [url, exercise.id]);

  if (!url || failed) {
    return <div className={`anatomical-gif-unavailable ${compact ? "is-compact" : ""}`} role="status">
      <ImageOff size={compact ? 22 : 34} aria-hidden="true" />
      <span>GIF anatômico não disponível para este exercício</span>
    </div>;
  }

  return <img
    className="workout-illustrated-gif"
    src={url}
    alt={`GIF anatômico demonstrando ${exercise.name}`}
    loading={compact ? "lazy" : "eager"}
    decoding="async"
    referrerPolicy="no-referrer"
    onError={() => setFailed(true)}
  />;
}
