/**
 * Ficha particular construída a partir das fotos dos treinos A–E.
 * NÃO substitui prescrição profissional e NÃO modifica treinos cadastrados no Supabase.
 * Os caminhos de GIF foram conferidos no catálogo público ExerciseGymGifsDB v1.1.0.
 */
export type PersonalWorkoutCode = "A" | "B" | "C" | "D" | "E";

export type PersonalExercise = {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  prescription: string;
  restSeconds: number;
  gifFile: string;
  tip: string;
  replaces?: string;
};

export type PersonalWorkout = {
  code: PersonalWorkoutCode;
  title: string;
  focus: string;
  exercises: PersonalExercise[];
};

const makeExercise = (
  id: string, name: string, muscle: string, equipment: string,
  prescription: string, restSeconds: number, gifFile: string, tip: string,
  replaces?: string,
): PersonalExercise => ({ id, name, muscle, equipment, prescription, restSeconds, gifFile, tip, replaces });

export const personalComfortWorkouts: PersonalWorkout[] = [
  {
    code: "A", title: "Pernas e abdômen", focus: "Ênfase em quadríceps, com movimentos sentados ou em pé.",
    exercises: [
      makeExercise("a-legpress", "Leg press 45°", "Quadríceps e glúteos", "Máquina", "3 × 10–12", 90, "glutes/sled-45-leg-press.gif", "Mantenha a lombar apoiada e não tire o quadril do banco.", "Leg press 180°"),
      makeExercise("a-stepup", "Subida no degrau com halteres", "Pernas e glúteos", "Degrau firme e halteres", "3 × 10 por perna", 90, "glutes/dumbbell-step-up.gif", "Suba de frente para o degrau, com apoio estável e sem impulso.", "Agachamento hack inclinado"),
      makeExercise("a-extensora", "Cadeira extensora", "Quadríceps", "Máquina", "3 × 12–15", 75, "quads/lever-leg-extension.gif", "Ajuste o eixo da máquina à altura dos joelhos."),
      makeExercise("a-adutora", "Cadeira adutora", "Adutores", "Máquina", "3 × 12–15", 60, "adductors/lever-seated-hip-adduction.gif", "Use uma abertura confortável, sem forçar a virilha."),
      makeExercise("a-panturrilha", "Panturrilha em pé", "Panturrilhas", "Peso corporal ou máquina", "3 × 15–20", 60, "calves/bodyweight-standing-calf-raise.gif", "Suba e desça os calcanhares sem balançar."),
      makeExercise("a-abdomen", "Abdominal sentado na máquina", "Abdômen", "Máquina", "3 × 12–15", 60, "abs/lever-seated-crunch.gif", "Faça a flexão do tronco com controle, sem puxar o pescoço.", "Abdominal infra alternado"),
      makeExercise("a-escada", "Escada ergométrica", "Aeróbico", "Escada", "10–15 minutos", 0, "cardio/walking-on-stepmill.gif", "Ritmo confortável; ajuste a intensidade com seu instrutor."),
    ],
  },
  {
    code: "B", title: "Costas e bíceps", focus: "Puxadas e remadas com apoio e posição confortável.",
    exercises: [
      makeExercise("b-puxada", "Puxada frontal na máquina", "Costas", "Máquina", "3 × 12–15", 90, "lats/lever-front-pulldown.gif", "Puxe à frente do tronco; evite levar a barra atrás da cabeça."),
      makeExercise("b-remada", "Remada sentada", "Costas", "Máquina", "3 × 12–15", 90, "upper-back/lever-seated-row.gif", "Mantenha o peito apoiado se o aparelho oferecer suporte."),
      makeExercise("b-puxador", "Puxada alta na polia", "Costas", "Polia", "3 × 12–15", 90, "lats/cable-lat-pulldown-full-range-of-motion.gif", "Conduza os cotovelos para baixo sem jogar o tronco para trás."),
      makeExercise("b-rosca-alt", "Rosca alternada", "Bíceps", "Halteres", "3 × 12–15", 75, "biceps/dumbbell-alternate-biceps-curl.gif", "Mantenha os cotovelos próximos ao corpo."),
      makeExercise("b-rosca-dir", "Rosca direta com halteres", "Bíceps", "Halteres", "3 × 12–15", 75, "biceps/dumbbell-biceps-curl.gif", "Sem impulso da lombar; controle a descida.", "Rosca direta na polia baixa"),
      makeExercise("b-ombro", "Desenvolvimento de ombros na máquina", "Ombros", "Máquina", "3 × 12–15", 90, "delts/lever-shoulder-press.gif", "Ajuste o banco e evite forçar a amplitude."),
      makeExercise("b-caminhada", "Caminhada na esteira", "Aeróbico", "Esteira", "15–25 minutos", 0, "cardio/walking-on-incline-treadmill.gif", "Use intensidade confortável, sem meta fixa de batimentos."),
    ],
  },
  {
    code: "C", title: "Posterior de coxa e glúteos", focus: "Sem ficar de bruços e sem agachamento sumô.",
    exercises: [
      makeExercise("c-flexora", "Cadeira flexora sentada", "Posterior de coxa", "Máquina", "4 × 12–15", 75, "hamstrings/lever-seated-leg-curl.gif", "Ajuste o encosto e o apoio acima dos tornozelos.", "Mesa flexora deitado"),
      makeExercise("c-flexora-pe", "Flexora unilateral em pé", "Posterior de coxa", "Máquina", "3 × 12 por perna", 75, "hamstrings/standing-single-leg-curl.gif", "Apoie o tronco e evite arquear a lombar.", "Agachamento sumô"),
      makeExercise("c-legpress", "Leg press horizontal unilateral", "Quadríceps e glúteos", "Máquina", "3 × 12 por perna", 90, "glutes/lever-horizontal-one-leg-press.gif", "Use carga leve para começar e mantenha o quadril apoiado.", "Leg press 45° adicional"),
      makeExercise("c-abdutora", "Abdução de quadril na máquina", "Glúteo médio", "Máquina", "3 × 15–20", 60, "abductors/lever-seated-hip-abduction.gif", "Mantenha o tronco apoiado; abra as pernas até uma amplitude confortável.", "Abdução 4 × 40"),
      makeExercise("c-lombar", "Extensão lombar sentada", "Lombar", "Máquina", "3 × 10–12", 75, "spine/lever-back-extension.gif", "Use a máquina sentada; não faça em banco romano.", "Hiperextensão no banco romano"),
      makeExercise("c-caminhada", "Caminhada na esteira", "Aeróbico", "Esteira", "10–20 minutos", 0, "cardio/walking-on-incline-treadmill.gif", "Termine em intensidade leve a moderada."),
    ],
  },
  {
    code: "D", title: "Peito, tríceps e ombros", focus: "Movimentos em máquinas e em pé, com menos repetição desnecessária.",
    exercises: [
      makeExercise("d-supino", "Supino inclinado na máquina", "Peito", "Máquina", "3 × 12–15", 90, "pectorals/lever-incline-chest-press.gif", "Escápulas apoiadas e controle na fase de retorno."),
      makeExercise("d-peck", "Peck deck", "Peito", "Máquina", "3 × 12–15", 75, "pectorals/lever-seated-fly.gif", "Regule o banco para manter os ombros confortáveis."),
      makeExercise("d-corda", "Tríceps corda", "Tríceps", "Polia", "3 × 12–15", 75, "triceps/cable-pushdown-with-rope-attachment.gif", "Cotovelos estáveis junto ao corpo."),
      makeExercise("d-frances", "Tríceps francês em pé", "Tríceps", "Halter", "3 × 12–15", 75, "triceps/dumbbell-standing-triceps-extension.gif", "Mantenha a coluna neutra e a carga controlada."),
      makeExercise("d-lateral", "Elevação lateral", "Ombros", "Halteres", "3 × 12–15", 60, "delts/dumbbell-lateral-raise.gif", "Não eleve os ombros em direção às orelhas."),
      makeExercise("d-posterior", "Remada para posterior de ombro na polia", "Ombro posterior", "Polia", "3 × 12–15", 75, "delts/cable-standing-rear-delt-row-with-rope.gif", "Traga a corda com os cotovelos afastados, sem inclinar o tronco.", "Elevação frontal"),
      makeExercise("d-escada", "Escada ergométrica", "Aeróbico", "Escada", "10–15 minutos", 0, "cardio/walking-on-stepmill.gif", "Reduza o ritmo se ficar sem ar ou indisposto."),
    ],
  },
  {
    code: "E", title: "Costas, peito e abdômen", focus: "Complementar, com posições em pé, sentado ou de costas.",
    exercises: [
      makeExercise("e-pulldown", "Pulldown com braços estendidos", "Costas", "Polia alta", "3 × 12", 75, "lats/cable-straight-arm-pulldown.gif", "Flexione levemente os joelhos e mantenha o tronco estável."),
      makeExercise("e-encolhimento", "Encolhimento de ombros", "Trapézio", "Halteres", "3 × 12", 75, "traps/dumbbell-shrug.gif", "Suba os ombros verticalmente, sem girá-los."),
      makeExercise("e-voador", "Voador inverso sentado", "Costas e ombro posterior", "Máquina", "3 × 12", 75, "delts/lever-seated-reverse-fly.gif", "Ajuste o assento e abra os braços com controle."),
      makeExercise("e-crucifixo", "Crucifixo inclinado", "Peito", "Banco inclinado e halteres", "3 × 12", 75, "pectorals/dumbbell-incline-fly.gif", "Deite de costas no banco e mantenha os cotovelos semiflexionados."),
      makeExercise("e-pullover", "Pullover com halter", "Peito e dorsais", "Banco e halter", "3 × 12", 75, "pectorals/dumbbell-pullover.gif", "Não force o ombro além da amplitude confortável."),
      makeExercise("e-abdomen", "Abdominal sentado na máquina", "Abdômen", "Máquina", "3 × 12–15", 60, "abs/lever-seated-crunch.gif", "Contraia o abdômen, sem puxar o tronco com os braços.", "Prancha 3 × 12 (unidade inconsistente)"),
    ],
  },
];

const GIF_CDN_BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/";

/** Nunca aceita URLs livres de usuário; somente caminhos fixos definidos nesta ficha. */
export function personalExerciseGifUrl(exercise: PersonalExercise): string {
  if (!/^[a-z-]+\/[a-z0-9-]+\.gif$/.test(exercise.gifFile)) return "";
  return GIF_CDN_BASE + exercise.gifFile;
}

/** Todas as alternativas evitam agachamentos ou posições de bruços. */
export const PERSONAL_WORKOUT_DISCLAIMER =
  "Ficha de referência para uso pessoal. Confira as substituições e cargas com o professor da academia. Não treine com dor, tontura ou mal-estar.";
