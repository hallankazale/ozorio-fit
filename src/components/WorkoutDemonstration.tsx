import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import { curatedWorkoutGif } from "../data/exerciseDemonstrations";
import { getWorkoutGifVariants } from "../data/workoutGifVariants";
import type { WorkoutExercise } from "../services/workoutService";

type Props = { exercise: WorkoutExercise; compact?: boolean };

/**
 * Mostra somente GIFs anatômicos. Para prescrições que não especificam o
 * equipamento, o aluno pode escolher a variação ilustrada no modal.
 * Um nome desconhecido nunca recebe uma demonstração inventada.
 */
export function WorkoutDemonstration({ exercise, compact = false }: Props) {
  const variants = getWorkoutGifVariants(exercise.name);
  const [variantIndex, setVariantIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const curated = curatedWorkoutGif(exercise.name);
  const existingTrusted = exercise.media_type === "gif" &&
    /^https:\/\/cdn\.jsdelivr\.net\/gh\/JahelCuadrado\/ExerciseGymGifsDB@v1\.1\.0\/[a-z-]+\/[a-z0-9-]+\.gif$/.test(exercise.media_url || "")
      ? exercise.media_url : null;

  const selectedVariant = !compact ? variants[variantIndex] : null;
  const src = selectedVariant?.src ?? curated ?? existingTrusted;

  useEffect(() => { setVariantIndex(0); setFailed(false); }, [exercise.id, exercise.name]);
  useEffect(() => { setFailed(false); }, [src]);

  const media = !src || failed
    ? <div className={`anatomical-gif-unavailable ${compact ? "is-compact" : ""}`} role="status">
        <ImageOff size={compact ? 22 : 34} aria-hidden="true"/>
        <span>GIF anatômico não disponível para este exercício</span>
      </div>
    : <img
        className="workout-illustrated-gif"
        src={src}
        alt={`GIF anatômico de ${exercise.name}${selectedVariant ? `, variação ${selectedVariant.label}` : ""}`}
        loading={compact ? "lazy" : "eager"}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />;

  if (compact || variants.length < 2) return media;

  return <div className="anatomical-variant-display">
    {media}
    <div className="anatomical-variant-switch" role="group" aria-label="Escolher variação do exercício">
      {variants.map((variation, i) => (
        <button key={variation.label} type="button" aria-pressed={i === variantIndex}
          className={i === variantIndex ? "selected" : ""}
          onClick={() => setVariantIndex(i)}>{variation.label}</button>
      ))}
    </div>
  </div>;
}
