import { personalComfortWorkouts } from "./personalComfortPlan";

/** Mapeamento explícito: não substitui uma execução por outra parecida sem correspondência segura. */
const aliases: Array<{ pattern: RegExp; path: string }> = [
  { pattern: /^puxada alta frente/, path: "lats/lever-front-pulldown.gif" },
  { pattern: /^remada horizontal/, path: "upper-back/lever-seated-row.gif" },
  { pattern: /^puxador articulado/, path: "lats/lever-front-pulldown.gif" },
  { pattern: /^rosca alternada/, path: "biceps/dumbbell-alternate-biceps-curl.gif" },
  { pattern: /^desenvolvimento six/, path: "delts/lever-shoulder-press.gif" },
  { pattern: /^leg press 45/, path: "glutes/sled-45-leg-press.gif" },
  { pattern: /^extensao pernas/, path: "quads/lever-leg-extension.gif" },
  { pattern: /^aducao de perna/, path: "adductors/lever-seated-hip-adduction.gif" },
  { pattern: /^abducao perna/, path: "abductors/lever-seated-hip-abduction.gif" },
  { pattern: /^flexao pernas deitado/, path: "hamstrings/lever-lying-leg-curl.gif" },
  { pattern: /^caminhada/, path: "cardio/walking-on-incline-treadmill.gif" },
  { pattern: /^supino inclinado/, path: "pectorals/lever-incline-chest-press.gif" },
  { pattern: /^peck deck/, path: "pectorals/lever-seated-fly.gif" },
  { pattern: /^triceps corda/, path: "triceps/cable-pushdown-with-rope-attachment.gif" },
  { pattern: /^triceps frances/, path: "triceps/dumbbell-standing-triceps-extension.gif" },
  { pattern: /^elevacao lateral/, path: "delts/dumbbell-lateral-raise.gif" },
  { pattern: /^elevacao frontal/, path: "delts/dumbbell-front-raise.gif" },
  { pattern: /^escada/, path: "cardio/walking-on-stepmill.gif" },
  { pattern: /^pull ?down/, path: "lats/cable-straight-arm-pulldown.gif" },
  { pattern: /^encolhimento de ombros/, path: "traps/dumbbell-shrug.gif" },
  { pattern: /^voador costas/, path: "delts/lever-seated-reverse-fly.gif" },
  { pattern: /^pullover/, path: "pectorals/dumbbell-pullover.gif" },
];

const CDN = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/";

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

/** Prefere mídia da ficha se já for animação. Caso contrário, oferece GIF apenas para nomes reconhecidos. */
export function curatedWorkoutGif(name: string): string | null {
  const normalized = normalize(name);
  const exact = personalComfortWorkouts.flatMap((item) => item.exercises)
    .find((item) => normalize(item.name) === normalized);
  const path = exact?.gifFile ?? aliases.find((item) => item.pattern.test(normalized))?.path;
  return path ? CDN + path : null;
}
