import { useEffect, useState } from "react";
import { curatedWorkoutGif } from "../data/exerciseDemonstrations";
import type { WorkoutExercise } from "../services/workoutService";
import { ExerciseDemo } from "./ExerciseDemo";
import { ExerciseMedia } from "./ExerciseMedia";

type Props = { exercise: WorkoutExercise; compact?: boolean };

/**
 * Preserva GIF/vídeo enviado pelo professor; para fotos, prefere GIF anatômico
 * somente quando há correspondência exata ou um alias curado.
 */
export function WorkoutDemonstration({ exercise, compact = false }: Props) {
  const url = exercise.media_type === "gif" || exercise.media_type === "video"
    ? null
    : curatedWorkoutGif(exercise.name);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [url, exercise.id]);

  if (url && !failed) {
    return <img
      className="workout-illustrated-gif"
      src={url}
      alt={`GIF demonstrativo de ${exercise.name}`}
      loading={compact ? "lazy" : "eager"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />;
  }
  return compact ? <ExerciseMedia exercise={exercise} compact /> : <ExerciseDemo exercise={exercise} />;
}
