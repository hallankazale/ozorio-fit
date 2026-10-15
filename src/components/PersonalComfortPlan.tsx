import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Dumbbell, ImageOff, Info, Play, RotateCcw } from "lucide-react";
import { ExerciseGuideDialog } from "./ExerciseGuideDialog";
import { readWorkoutPrescription } from "../utils/workoutPrescription";
import {
  PERSONAL_WORKOUT_DISCLAIMER,
  personalComfortWorkouts,
  personalExerciseGifUrl,
  type PersonalExercise,
  type PersonalWorkoutCode,
} from "../data/personalComfortPlan";
import "../personal-comfort-plan.css";

type Props = { accountId: string };

function currentLocalDay(): string {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
}

function ExerciseAnimation({ exercise }: { exercise: PersonalExercise }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [exercise.gifFile]);

  const url = personalExerciseGifUrl(exercise);
  if (failed || !url) {
    return <div className="comfort-gif-missing"><ImageOff size={25}/><span>Demonstração indisponível. Confirme a execução com o instrutor.</span></div>;
  }

  return <img
    className="comfort-exercise-gif"
    src={url}
    alt={`GIF demonstrando ${exercise.name}`}
    loading="lazy"
    decoding="async"
    referrerPolicy="no-referrer"
    onError={() => setFailed(true)}
  />;
}

/** Área independente: não altera fichas ou registros do professor no Supabase. */
export function PersonalComfortPlan({ accountId }: Props) {
  const [selectedCode, setSelectedCode] = useState<PersonalWorkoutCode>("A");
  const [selectedExercise, setSelectedExercise] = useState<PersonalExercise | null>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const storageKey = useMemo(() => `ozorio-fit:treino-confortavel:v1:${accountId}:${currentLocalDay()}`, [accountId]);

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
      setCompleted(parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, boolean> : {});
    } catch {
      setCompleted({});
    }
  }, [storageKey]);

  const selected = personalComfortWorkouts.find((item) => item.code === selectedCode) ?? personalComfortWorkouts[0];
  const finished = selected.exercises.filter((item) => completed[item.id]).length;

  function saveProgress(next: Record<string, boolean>) {
    setCompleted(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Permite continuar a usar a ficha mesmo com armazenamento privado/desabilitado.
    }
  }

  function toggleExercise(id: string) {
    saveProgress({ ...completed, [id]: !completed[id] });
  }

  function resetCurrentWorkout() {
    const next = { ...completed };
    for (const exercise of selected.exercises) delete next[exercise.id];
    saveProgress(next);
  }

  return <section className="personal-comfort-section" aria-label="Ficha A a E adaptada">
    <div className="comfort-heading">
      <div><span className="comfort-overline">USO PESSOAL · MODELO ADAPTADO</span><h2>Meu treino confortável</h2><p>Sem agachamentos e sem exercícios de bruços. Os movimentos foram adaptados das suas fotos.</p></div>
      <Dumbbell aria-hidden="true"/>
    </div>
    <p className="comfort-disclaimer"><Info size={17} aria-hidden="true"/>{PERSONAL_WORKOUT_DISCLAIMER}</p>

    <div className="comfort-tabs" role="tablist" aria-label="Selecionar treino">
      {personalComfortWorkouts.map((workout) => <button key={workout.code} type="button" role="tab"
        aria-selected={selectedCode === workout.code}
        className={selectedCode === workout.code ? "is-selected" : ""}
        onClick={() => { setSelectedCode(workout.code); setSelectedExercise(null); }}>Treino {workout.code}</button>)}
    </div>

    <div className="comfort-workout-meta">
      <div><h3>{selected.title}</h3><p>{selected.focus}</p></div>
      <span>{finished} de {selected.exercises.length} feitos</span>
    </div>
    <div className="comfort-progress" role="progressbar" aria-label="Progresso do treino" aria-valuemin={0} aria-valuemax={selected.exercises.length} aria-valuenow={finished}>
      <span style={{ width: `${(finished / selected.exercises.length) * 100}%` }}/>
    </div>

    <div className="comfort-exercise-list">
      {selected.exercises.map((exercise, index) => <article key={exercise.id} className={`comfort-exercise ${completed[exercise.id] ? "is-done" : ""}`}>
        <button
          type="button"
          className="comfort-exercise-visual"
          aria-label={`Ver GIF e aprender a fazer ${exercise.name}`}
          aria-haspopup="dialog"
          onClick={() => setSelectedExercise(exercise)}
        >
          <ExerciseAnimation exercise={exercise}/>
          <span className="comfort-exercise-index">{index + 1}</span>
          <span className="comfort-play" aria-hidden="true"><Play size={13} fill="currentColor" /></span>
        </button>
        <div className="comfort-exercise-info">
          <h4>{exercise.name}</h4>
          <p className="comfort-equipment">{exercise.equipment}</p>
          <p className="comfort-muscle">{exercise.muscle}</p>
          <div className="comfort-compact-facts">
            <strong>{exercise.prescription}</strong>
            <span>{exercise.restSeconds > 0 ? `Desc. ${exercise.restSeconds}s` : "Aeróbico"}</span>
            <span>Carga: ajustar</span>
          </div>
          <button type="button" className={`comfort-done-button ${completed[exercise.id] ? "is-done" : ""}`} onClick={() => toggleExercise(exercise.id)}>
            <CheckCircle2 size={15} aria-hidden="true"/>{completed[exercise.id] ? "Feito · desfazer" : "Marcar como feito"}
          </button>
        </div>
      </article>)}
    </div>
    {selectedExercise && (
      <ExerciseGuideDialog
        title={selectedExercise.name}
        subtitle={selectedExercise.muscle}
        media={<ExerciseAnimation exercise={selectedExercise} />}
        stats={[
          { label: "Séries", value: readWorkoutPrescription(selectedExercise.prescription).sets },
          { label: "Repetições / tempo", value: readWorkoutPrescription(selectedExercise.prescription).reps },
          { label: "Descanso", value: selectedExercise.restSeconds > 0 ? `${selectedExercise.restSeconds}s` : "—" },
          { label: "Carga", value: selectedExercise.restSeconds > 0 ? "A definir" : "Não se aplica" },
        ]}
        instruction={`${selectedExercise.equipment}: ${selectedExercise.tip}${selectedExercise.replaces ? ` Substitui: ${selectedExercise.replaces}.` : ""}`}
        credit="GIF: ExerciseGymGifsDB · reprodução animada"
        onClose={() => setSelectedExercise(null)}
      />
    )}
    <button type="button" className="comfort-reset" onClick={resetCurrentWorkout}><RotateCcw size={16} aria-hidden="true"/> Reiniciar marcações deste treino</button>
    <p className="comfort-credit">GIFs demonstrativos externos: ExerciseGymGifsDB (JahelCuadrado, v1.1.0). Exigem conexão com a internet. O uso pessoal não autoriza automaticamente redistribuição das mídias.</p>
  </section>;
}
