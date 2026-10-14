import { CheckCircle2, Clock3, Dumbbell, Play, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { BrandLogo } from "../components/BrandLogo";
import { ExerciseGuideDialog } from "../components/ExerciseGuideDialog";
import { WorkoutDemonstration } from "../components/WorkoutDemonstration";
import { curatedWorkoutGif } from "../data/exerciseDemonstrations";
import { PersonalComfortPlan } from "../components/PersonalComfortPlan";
import { listOwnWorkoutPrograms, type WorkoutExercise, type WorkoutProgram } from "../services/workoutService";
import { useAccount } from "../state/AccountContext";

export function WorkoutsScreen() {
  const navigate = useNavigate();
  const { account } = useAccount();
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailExercise, setDetailExercise] = useState<WorkoutExercise | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const items = await listOwnWorkoutPrograms();
      setPrograms(items);
      setSelectedId((current) => items.some((item) => item.id === current) ? current : items[0]?.id ?? "");
    } catch (err) {
      setPrograms([]);
      setError(readError(err, "Não foi possível carregar seus treinos."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const workout = useMemo(() => programs.find((item) => item.id === selectedId) ?? programs[0] ?? null, [programs, selectedId]);

  return <AppShell title="Treinos"><div className="page-pad student-workouts-page">
    <section className="hero-card user-summary"><BrandLogo compact/><div className="hero-card__divider"/><div><h2>{account?.profile.full_name || "Aluno"}</h2><span className="status-chip status-chip--success"><CheckCircle2 size={15}/> {account?.profile.status === "active" ? "Ativo" : "Inativo"}</span><p><Clock3 size={15}/> Matrícula #{account?.profile.membership_number ?? "—"}</p></div></section>

    <details className="personal-comfort-details">
      <summary>Minha ficha adaptada A–E · uso pessoal</summary>
      <PersonalComfortPlan accountId={account?.user.id ?? "anon"} />
    </details>

    {loading && <section className="section-card workout-empty-state"><RefreshCw className="spin"/><h2>Carregando sua ficha...</h2></section>}
    {!loading && error && <section className="section-card workout-empty-state"><Dumbbell/><h2>Não foi possível carregar</h2><p>{error}</p><button className="outline-button" onClick={() => void load()}>Tentar novamente</button></section>}
    {!loading && !error && programs.length === 0 && <section className="section-card workout-empty-state"><Dumbbell/><h2>Nenhum treino prescrito</h2><p>Quando o professor montar sua ficha, ela aparecerá aqui automaticamente.</p></section>}

    {!loading && !error && workout && <>
      <div className="segmented">{programs.map((item)=><button key={item.id} className={selectedId===item.id?"active":""} onClick={()=>setSelectedId(item.id)}>Treino {item.code}</button>)}</div>
      <section className="workout-header"><div className="round-icon green"><Dumbbell/></div><div><h2>{workout.title}</h2><p>{workout.subtitle || `${workout.workout_exercises.length} exercícios`}</p></div></section>

      <div className="student-exercise-grid">
        {workout.workout_exercises.map((exercise, index) => (
          <article key={exercise.id} className="student-exercise-card">
            <button type="button" className="student-exercise-image"
              onClick={() => setDetailExercise(exercise)}
              aria-label={`Ver GIF e aprender a fazer ${exercise.name}`}
              aria-haspopup="dialog"
            >
              <WorkoutDemonstration exercise={exercise} compact />
              <span className="student-exercise-number">{index + 1}</span>
              <span className="student-exercise-tap">▶</span>
            </button>
            <div className="student-exercise-copy">
              <h3>{exercise.name}</h3>
              <p className="student-exercise-muscle">{exercise.muscle_group}</p>
              <p><b>{exercise.sets} × {exercise.reps_min}{exercise.reps_max !== exercise.reps_min ? `–${exercise.reps_max}` : ""}</b></p>
              <p>Descanso: {exercise.rest_seconds}s</p>
              <p>Carga: {exercise.suggested_load_kg == null ? "a definir" : `${exercise.suggested_load_kg} kg`}</p>
            </div>
          </article>
        ))}
      </div>

      <button className="primary-button sticky-action" disabled={workout.workout_exercises.length === 0} onClick={()=>navigate(`/treinos/ativo?program=${workout.id}`)}><Play size={19}/> Iniciar treino</button>
    </>}

    {detailExercise && (
      <ExerciseGuideDialog
        title={detailExercise.name}
        subtitle={detailExercise.muscle_group || "Exercício de musculação"}
        media={<WorkoutDemonstration exercise={detailExercise}/>}
        stats={[
          { label: "Séries", value: String(detailExercise.sets) },
          { label: "Repetições", value: `${detailExercise.reps_min}${detailExercise.reps_max === detailExercise.reps_min ? "" : `–${detailExercise.reps_max}`}` },
          { label: "Descanso", value: `${detailExercise.rest_seconds}s` },
          { label: "Carga", value: detailExercise.suggested_load_kg == null ? "A definir" : `${detailExercise.suggested_load_kg} kg` },
        ]}
        instruction={detailExercise.notes || `Execute ${detailExercise.name} com movimento controlado e orientação do instrutor.`}
        credit={detailExercise.media_type !== "gif" && detailExercise.media_type !== "video" && curatedWorkoutGif(detailExercise.name)
          ? "GIF demonstrativo: ExerciseGymGifsDB" : detailExercise.media_attribution}
        onClose={() => setDetailExercise(null)}
      />
    )}

  </div></AppShell>;
}

function readError(error: unknown, fallback: string) { if (error && typeof error === "object" && "message" in error) return String((error as { message?: unknown }).message || fallback); return fallback; }
