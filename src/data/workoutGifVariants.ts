import { supplementalExerciseGif } from "./supplementalExerciseGifs";

export type GifVariant = { label: string; src: string };

const PRIMARY_CDN = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/";
const primary = (file: string) => PRIMARY_CDN + file;
const externalHorizontalPress = supplementalExerciseGif("leg press horizontal");

const options: Readonly<Record<string, readonly GifVariant[]>> = {
  "hack squat ou leg press": [
    { label: "Hack squat", src: primary("glutes/sled-hack-squat.gif") },
    { label: "Leg press 45°", src: primary("glutes/sled-45-leg-press.gif") },
  ],
  "leg press": [
    { label: "Leg press 45°", src: primary("glutes/sled-45-leg-press.gif") },
    ...(externalHorizontalPress ? [{ label: "Leg press horizontal", src: externalHorizontalPress }] : []),
  ],
  "supino inclinado": [
    { label: "Barra", src: primary("pectorals/barbell-incline-bench-press.gif") },
    { label: "Halteres", src: primary("pectorals/dumbbell-incline-bench-press.gif") },
    { label: "Máquina", src: primary("pectorals/lever-incline-chest-press.gif") },
  ],
  "remada": [
    { label: "Máquina", src: primary("upper-back/lever-seated-row.gif") },
    { label: "Polia", src: primary("upper-back/cable-seated-row.gif") },
    { label: "Halter", src: primary("upper-back/dumbbell-one-arm-bent-over-row.gif") },
  ],
  "desenvolvimento de ombros": [
    { label: "Halteres", src: primary("delts/dumbbell-seated-shoulder-press.gif") },
    { label: "Máquina", src: primary("delts/lever-shoulder-press.gif") },
  ],
  "elevacao de pernas": [
    { label: "Deitado", src: primary("abs/lying-leg-raise-flat-bench.gif") },
    { label: "Suspenso", src: primary("abs/hanging-leg-raise.gif") },
  ],
  "afundo": [
    { label: "Peso corporal", src: primary("glutes/forward-lunge-male.gif") },
    { label: "Com halteres", src: primary("glutes/dumbbell-lunge.gif") },
  ],
  "agachamento": [
    { label: "Com barra", src: primary("glutes/barbell-full-squat.gif") },
    { label: "Com halteres", src: primary("glutes/dumbbell-squat.gif") },
  ],
  "panturrilha": [
    { label: "Em pé", src: primary("calves/bodyweight-standing-calf-raise.gif") },
    { label: "Na máquina", src: primary("calves/lever-standing-calf-raise.gif") },
  ],
  "elevacao pelvica": [
    { label: "No solo", src: primary("glutes/low-glute-bridge-on-floor.gif") },
    { label: "Com barra", src: primary("glutes/barbell-glute-bridge.gif") },
  ],
};

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

/** Variações explícitas para nomes genéricos da ficha, sem adivinhar o aparelho. */
export function getWorkoutGifVariants(name: string): readonly GifVariant[] {
  return options[normalize(name)] ?? [];
}
