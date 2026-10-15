import { personalComfortWorkouts } from "./personalComfortPlan";
import { anatomicalGifAlias } from "./exerciseNameAliases";
import { supplementalExerciseGif } from "./supplementalExerciseGifs";

/**
 * Catálogo curado dos movimentos fotografados (A–E) e variações comuns.
 * O acessório faz parte da identidade do exercício: supino com HALTERES nunca
 * pode exibir uma máquina. Movimentos diferentes não recebem GIF inventado.
 */
const pathsByName: Readonly<Record<string, string>> = {
  // Treino A
  "leg 180": "glutes/lever-horizontal-one-leg-press.gif",
  "leg press 180": "glutes/lever-horizontal-one-leg-press.gif",
  "leg press 180 graus": "glutes/lever-horizontal-one-leg-press.gif",
  "agachamento inclinado": "glutes/sled-hack-squat.gif",
  "agachamento inclinado maquina hack": "glutes/sled-hack-squat.gif",
  "agachamento hack": "glutes/sled-hack-squat.gif",
  "hack squat": "glutes/sled-hack-squat.gif",
  "extensao pernas": "quads/lever-leg-extension.gif",
  "extensao de pernas": "quads/lever-leg-extension.gif",
  "cadeira extensora": "quads/lever-leg-extension.gif",
  "aducao de perna": "adductors/lever-seated-hip-adduction.gif",
  "cadeira adutora": "adductors/lever-seated-hip-adduction.gif",
  "flexao panturrilhas em pe": "calves/bodyweight-standing-calf-raise.gif",
  "panturrilha em pe": "calves/bodyweight-standing-calf-raise.gif",
  "abdominal infra alternado": "abs/band-bicycle-crunch.gif",
  "abdominal bicicleta": "abs/band-bicycle-crunch.gif",
  "escada": "cardio/walking-on-stepmill.gif",
  "escada ergometrica": "cardio/walking-on-stepmill.gif",
  // Treino B
  "puxada alta frente": "lats/lever-front-pulldown.gif",
  "puxada frontal": "lats/lever-front-pulldown.gif",
  "puxada alta na polia": "lats/cable-lat-pulldown-full-range-of-motion.gif",
  "remada horizontal": "upper-back/lever-seated-row.gif",
  "remada sentada": "upper-back/lever-seated-row.gif",
  "remada baixa": "upper-back/cable-seated-row.gif",
  "puxador articulado": "lats/lever-front-pulldown.gif",
  "rosca alternada": "biceps/dumbbell-alternate-biceps-curl.gif",
  "rosca direta": "biceps/barbell-curl.gif",
  "rosca direta polia baixa": "biceps/cable-curl.gif",
  "rosca direta com halteres": "biceps/dumbbell-biceps-curl.gif",
  "desenvolvimento six": "delts/lever-shoulder-press.gif",
  "desenvolvimento de ombros na maquina": "delts/lever-shoulder-press.gif",
  "caminhada": "cardio/walking-on-incline-treadmill.gif",
  "caminhada na esteira": "cardio/walking-on-incline-treadmill.gif",
  // Treino C
  "flexao pernas deitado": "hamstrings/lever-lying-leg-curl.gif",
  "mesa flexora": "hamstrings/lever-lying-leg-curl.gif",
  "cadeira flexora sentada": "hamstrings/lever-seated-leg-curl.gif",
  "flexora unilateral em pe": "hamstrings/standing-single-leg-curl.gif",
  "agachamento sumo": "glutes/smith-sumo-squat.gif",
  "agachamento sumo halteres": "glutes/smith-sumo-squat.gif",
  "leg press 45": "glutes/sled-45-leg-press.gif",
  "leg press 45 graus": "glutes/sled-45-leg-press.gif",
  "leg press horizontal unilateral": "glutes/lever-horizontal-one-leg-press.gif",
  "abducao perna": "abductors/lever-seated-hip-abduction.gif",
  "abducao de perna": "abductors/lever-seated-hip-abduction.gif",
  "abducao de quadril na maquina": "abductors/lever-seated-hip-abduction.gif",
  "cadeira abdutora": "abductors/lever-seated-hip-abduction.gif",
  "hiperextensao lombar bracos peito": "spine/hyperextension-on-bench.gif",
  "extensao lombar sentada": "spine/lever-back-extension.gif",
  // Treino D
  "supino inclinado maquina": "pectorals/lever-incline-chest-press.gif",
  "supino inclinado na maquina": "pectorals/lever-incline-chest-press.gif",
  "supino inclinado com halteres": "pectorals/dumbbell-incline-bench-press.gif",
  "supino inclinado halteres": "pectorals/dumbbell-incline-bench-press.gif",
  "supino inclinado com barra": "pectorals/barbell-incline-bench-press.gif",
  "supino reto com halteres": "pectorals/dumbbell-bench-press.gif",
  "supino reto": "pectorals/barbell-bench-press.gif",
  "peck deck": "pectorals/lever-seated-fly.gif",
  "triceps corda": "triceps/cable-pushdown-with-rope-attachment.gif",
  "triceps frances": "triceps/dumbbell-standing-triceps-extension.gif",
  "triceps frances em pe": "triceps/dumbbell-standing-triceps-extension.gif",
  "elevacao lateral em pe": "delts/dumbbell-lateral-raise.gif",
  "elevacao lateral": "delts/dumbbell-lateral-raise.gif",
  "elevacao frontal": "delts/dumbbell-front-raise.gif",
  "elevacao frontal halteres": "delts/dumbbell-front-raise.gif",
  "remada para posterior de ombro na polia": "delts/cable-standing-rear-delt-row-with-rope.gif",
  // Treino E
  "pull down": "lats/cable-straight-arm-pulldown.gif",
  "pull down polia alta": "lats/cable-straight-arm-pulldown.gif",
  "pulldown com bracos estendidos": "lats/cable-straight-arm-pulldown.gif",
  "encolhimento de ombros": "traps/dumbbell-shrug.gif",
  "voador costas": "delts/lever-seated-reverse-fly.gif",
  "voador costas maquina": "delts/lever-seated-reverse-fly.gif",
  "voador inverso sentado": "delts/lever-seated-reverse-fly.gif",
  "crucifixo fly": "pectorals/dumbbell-fly.gif",
  "crucifixo fly banco reto halteres": "pectorals/dumbbell-fly.gif",
  "crucifixo inclinado": "pectorals/dumbbell-incline-fly.gif",
  "crucifixo inclinado com halteres": "pectorals/dumbbell-incline-fly.gif",
  "pullover": "pectorals/dumbbell-pullover.gif",
  "pullover banco halteres": "pectorals/dumbbell-pullover.gif",
  "pullover com halter": "pectorals/dumbbell-pullover.gif",
  "prancha": "abs/weighted-front-plank.gif",
  "prancha solo": "abs/weighted-front-plank.gif",
  "abdominal sentado na maquina": "abs/lever-seated-crunch.gif",
};

/** URLs só surgem a partir de IDs curados, nunca de texto bruto do banco. */
const CDN = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/";

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

/** Resolve primeiro pelo nome + equipamento, sem mostrar um aparelho errado. */
export function curatedWorkoutGif(name: string): string | null {
  const key = normalize(name);
  // O acervo suplementar tem prioridade apenas para variações específicas.
  const exactSupplement = supplementalExerciseGif(key);
  if (exactSupplement) return exactSupplement;
  const direct = anatomicalGifAlias(key) ?? pathsByName[key];
  if (direct) return CDN + direct;

  const personal = personalComfortWorkouts.flatMap((workout) => workout.exercises)
    .find((exercise) => normalize(exercise.name) === key);
  if (personal) return CDN + personal.gifFile;

  // Sufixos do aplicativo original (máquina/halteres) exigem identificação.
  const allowed = [
    { pattern: /^(puxada alta frente|puxador articulado)( maquina)?$/, path: "lats/lever-front-pulldown.gif" },
    { pattern: /^remada horizontal( maquina)?$/, path: "upper-back/lever-seated-row.gif" },
    { pattern: /^rosca direta( na)? polia baixa$/, path: "biceps/cable-curl.gif" },
    { pattern: /^extensao( de)? pernas maquina$/, path: "quads/lever-leg-extension.gif" },
    { pattern: /^flexao( de)? pernas deitado( maquina)?$/, path: "hamstrings/lever-lying-leg-curl.gif" },
    { pattern: /^supino inclinado( na)? maquina$/, path: "pectorals/lever-incline-chest-press.gif" },
    { pattern: /^supino inclinado( com)? halteres$/, path: "pectorals/dumbbell-incline-bench-press.gif" },
    { pattern: /^crucifixo fly banco reto( halteres)?$/, path: "pectorals/dumbbell-fly.gif" },
  ];
  const match = allowed.find(({ pattern }) => pattern.test(key));
  return match ? CDN + match.path : null;
}

/** Catálogo independente da aplicação; usado nos testes e QA do plano A–E fotografado. */
export function anatomicalGifCredit(name: string): string {
  return supplementalExerciseGif(name)
    ? "GIF: banco-de-exercicios-gif / GitHub"
    : "GIF: ExerciseGymGifsDB / GitHub";
}

export const photographedWorkoutNames = [
  "LEG 180", "AGACHAMENTO INCLINADO", "EXTENSÃO PERNAS", "ADUÇÃO DE PERNA",
  "FLEXÃO PANTURRILHAS EM PÉ", "ABDOMINAL INFRA ALTERNADO", "ESCADA",
  "PUXADA ALTA FRENTE", "REMADA HORIZONTAL", "PUXADOR ARTICULADO",
  "ROSCA ALTERNADA", "ROSCA DIRETA POLIA BAIXA", "DESENVOLVIMENTO SIX", "CAMINHADA",
  "FLEXÃO PERNAS DEITADO", "AGACHAMENTO SUMÔ", "LEG PRESS 45°",
  "ABDUÇÃO PERNA", "HIPEREXTENSÃO LOMBAR BRAÇOS PEITO", "SUPINO INCLINADO MÁQUINA",
  "PECK DECK", "TRÍCEPS CORDA", "TRÍCEPS FRANCÊS", "ELEVAÇÃO LATERAL EM PÉ",
  "ELEVAÇÃO FRONTAL", "PULL DOWN", "ENCOLHIMENTO DE OMBROS",
  "VOADOR COSTAS", "CRUCIFIXO FLY", "PULLOVER", "PRANCHA",
] as const;
