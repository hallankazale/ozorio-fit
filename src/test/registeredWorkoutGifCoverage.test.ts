import { describe, expect, it } from "vitest";
import { curatedWorkoutGif } from "../data/exerciseDemonstrations";

/**
 * Nomes distintos cadastrados nos treinos do Ozorio Fit (apenas nomes de
 * movimentos, nenhuma informação pessoal). Impede regressão com GIF ausente.
 */
const activeExerciseNames = [
  "Ab roller",
  "Abdominal bicicleta",
  "Abdominal na máquina",
  "Abdominal na polia",
  "Abdominal reverso",
  "Afundo",
  "Afundo caminhando",
  "Agachamento",
  "Agachamento livre com barra",
  "Cadeira extensora",
  "Crossover",
  "Crossover no cabo",
  "Desenvolvimento com halteres",
  "Desenvolvimento de ombros",
  "Elevação de pernas",
  "Elevação lateral",
  "Elevação lateral com halteres",
  "Elevação pélvica",
  "Face pull no cabo",
  "Hack squat ou leg press",
  "Hip thrust com barra",
  "Leg press",
  "Levantamento terra romeno com barra",
  "Mesa flexora",
  "Panturrilha",
  "Panturrilha em pé",
  "Ponte de glúteos com barra",
  "Prancha",
  "Pulldown",
  "Puxada aberta pela frente",
  "Puxada frontal",
  "Remada",
  "Remada baixa",
  "Remada baixa no cabo",
  "Remada unilateral",
  "Remada unilateral com halter",
  "Rosca bíceps",
  "Rosca direta",
  "Rosca direta com barra",
  "Rosca martelo",
  "Rosca martelo alternada",
  "Stiff",
  "Supino inclinado",
  "Supino inclinado com halteres",
  "Supino reto",
  "Supino reto com barra",
  "Toque alternado nos calcanhares",
  "Tríceps francês",
  "Tríceps na corda",
  "Tríceps na polia"
] as const;

describe("Cobertura dos GIFs anatômicos no catálogo do aluno", () => {
  it("resolve os 50 nomes de exercícios realmente cadastrados", () => {
    expect(activeExerciseNames).toHaveLength(50);
    for (const exercise of activeExerciseNames) {
      expect(curatedWorkoutGif(exercise), exercise).toMatch(/^https:\/\/.+\.gif$/);
    }
  });

  it("usa variações exatas de equipamento disponíveis no acervo suplementar", () => {
    expect(curatedWorkoutGif("Face pull no cabo")).toContain("cable-face-pull");
    expect(curatedWorkoutGif("Leg press horizontal")).toContain("Leg%20press%20horizontal");
    expect(curatedWorkoutGif("Agachamento sumô com halteres")).toContain("Agachamento%20sumo%20com%20halteres");
    expect(curatedWorkoutGif("Stiff com barra")).toContain("stiff%20com%20barra");
  });
});
