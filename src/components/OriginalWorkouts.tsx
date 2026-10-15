import { CheckCircle2, Dumbbell, ImageOff, Play, RotateCcw, AlertTriangle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import originalData from "../data/originalWorkouts.json";
import { ExerciseGuideDialog } from "./ExerciseGuideDialog";
import { readWorkoutPrescription } from "../utils/workoutPrescription";
import "../personal-comfort-plan.css";

type Exercise = (typeof originalData.workouts)[number]["exercises"][number];
type Workout = (typeof originalData.workouts)[number];

function localDay(): string {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth()+1).padStart(2,"0"), String(now.getDate()).padStart(2,"0")].join("-");
}

function AnimatedAnatomy({ exercise }: { exercise: Exercise }) {
  const [failed,setFailed]=useState(false);
  useEffect(()=>setFailed(false),[exercise.gifUrl]);
  return !failed ? <img className="comfort-exercise-gif" src={exercise.gifUrl}
    loading="lazy" decoding="async" referrerPolicy="no-referrer"
    alt={`Movimento anatômico: ${exercise.name}`} onError={()=>setFailed(true)} />
  : <div className="comfort-gif-missing"><ImageOff size={23}/><span>GIF indisponível sem internet</span></div>;
}

/** Os dados fotografados ficam em JSON, reutilizado no APK Android. */
export function OriginalWorkouts({ accountId }: { accountId: string }) {
  const [code,setCode]=useState("A");
  const [opened,setOpened]=useState<Exercise | null>(null);
  const [done,setDone]=useState<Record<string,boolean>>({});
  const key=useMemo(()=>`ozorio-fit:original-ae:${accountId}:${localDay()}`,[accountId]);
  useEffect(()=>{
    try {
      const item: unknown=JSON.parse(localStorage.getItem(key)??"{}");
      setDone(item && typeof item==="object" && !Array.isArray(item)?item as Record<string,boolean>:{});
    } catch { setDone({}); }
  },[key]);

  function save(next: Record<string,boolean>) {
    setDone(next);
    try { localStorage.setItem(key,JSON.stringify(next)); } catch { /* modo privado */ }
  }
  const workout: Workout=originalData.workouts.find(w=>w.code===code)??originalData.workouts[0];
  const count=workout.exercises.filter(x=>done[x.id]).length;

  return <section className="personal-comfort-section original-workouts" aria-label="Ficha original de hipertrofia A a E">
    <div className="comfort-heading">
      <div>
        <span className="comfort-overline">SUA FICHA ORIGINAL · A–E</span>
        <h2>Hipertrofia com GIF anatômico</h2>
        <p>Exercícios e quantidades das 12 fotos, sem substituir as posições da ficha.</p>
      </div>
      <Dumbbell aria-hidden="true"/>
    </div>
    <div className="comfort-tabs" role="tablist" aria-label="Escolha o treino original">
      {originalData.workouts.map(w=><button key={w.code} type="button" role="tab"
        aria-selected={code===w.code} className={code===w.code?"is-selected":""}
        onClick={()=>{setCode(w.code);setOpened(null);}}>Treino {w.code}</button>)}
    </div>
    <div className="comfort-workout-meta">
      <div><h3>{workout.title}</h3><p>{workout.focus}</p></div>
      <span>{count}/{workout.exercises.length} feitos</span>
    </div>
    <div className="comfort-progress" role="progressbar" aria-label="Exercícios concluídos" aria-valuemin={0}
      aria-valuemax={workout.exercises.length} aria-valuenow={count}>
      <span style={{width:`${count/workout.exercises.length*100}%`}}/>
    </div>
    <div className="comfort-exercise-list">
      {workout.exercises.map((x,i)=><article key={x.id} className={`comfort-exercise ${done[x.id]?"is-done":""}`}>
        <button type="button" className="comfort-exercise-visual"
          aria-label={`Ver GIF e como fazer ${x.name}`} aria-haspopup="dialog" onClick={()=>setOpened(x)}>
          <AnimatedAnatomy exercise={x}/>
          <span className="comfort-exercise-index">{i+1}</span>
          <span className="comfort-play" aria-hidden="true"><Play size={13} fill="currentColor"/></span>
        </button>
        <div className="comfort-exercise-info">
          <h4>{x.name}</h4>
          <p className="comfort-equipment">{x.equipment}</p>
          <p className="comfort-muscle">{x.muscle}</p>
          <div className="comfort-compact-facts"><strong>{x.prescription}</strong><span>Carga: a definir</span></div>
          {x.observation && <span className="original-warning"><AlertTriangle size={12}/> Confirmar detalhe da ficha</span>}
          <button type="button" className={`comfort-done-button ${done[x.id]?"is-done":""}`}
            onClick={()=>save({...done,[x.id]:!done[x.id]})}>
            <CheckCircle2 size={15}/>{done[x.id]?"Feito · desfazer":"Marcar como feito"}
          </button>
        </div>
      </article>)}
    </div>
    {opened && <ExerciseGuideDialog title={opened.name} subtitle={opened.muscle}
      media={<AnimatedAnatomy exercise={opened}/>}
      stats={[
        {label:"Séries",value:readWorkoutPrescription(opened.prescription).sets},
        {label:"Repetições / tempo",value:readWorkoutPrescription(opened.prescription).reps},
        {label:"Descanso",value:"Não informado"},
        {label:"Carga",value:"A definir"},
      ]}
      instruction={`${opened.equipment}: ${opened.how}${opened.observation?" Atenção: "+opened.observation:""}`}
      credit="Demonstração: acervos anatômicos do GitHub (internet necessária)"
      onClose={()=>setOpened(null)}/>}
    <button type="button" className="comfort-reset" onClick={()=>{
      const next={...done};workout.exercises.forEach(x=>delete next[x.id]);save(next);
    }}><RotateCcw size={16}/> Reiniciar marcações deste treino</button>
    <p className="comfort-credit">{originalData.notice} Uma ficha fotografada não substitui a orientação do seu professor.</p>
  </section>;
}
