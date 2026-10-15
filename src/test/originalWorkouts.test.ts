import { describe, expect, it } from "vitest";
import original from "../data/originalWorkouts.json";
import { readWorkoutPrescription } from "../utils/workoutPrescription";

describe("Ficha original de 12 fotos", () => {
  it("mantém exatamente 5 treinos e 33 movimentos em ordem", () => {
    expect(original.workouts.map(w=>w.code)).toEqual(["A","B","C","D","E"]);
    expect(original.workouts.map(w=>w.exercises.length)).toEqual([7,7,6,7,6]);
    const ids = original.workouts.flatMap(w=>w.exercises.map(e=>e.id));
    expect(new Set(ids).size).toBe(33);
    expect(original.workouts[2].exercises[0].name).toBe("Flexão pernas deitado");
    expect(original.workouts[2].exercises[1].name).toBe("Agachamento sumô");
    expect(original.workouts[3].exercises[2].prescription).toBe("4 × 15");
    expect(original.workouts[4].exercises.at(-1)?.prescription).toBe("3 × 12");
  });
  it("não inventa descansos ausentes das fotos", () => {
    for (const x of original.workouts.flatMap(w=>w.exercises)) {
      expect(x.restSeconds).toBeNull();
      expect(x.gifUrl).toMatch(/^https:\/\//);
      expect(x.gifUrl).toMatch(/\.gif$/);
      expect(x.how.length).toBeGreaterThan(10);
    }
  });
  it("preserva observações e durações ambíguas sem alterar prescrição", () => {
    expect(original.workouts[0].exercises[5].prescription).toBe("10–20 minutos");
    expect(readWorkoutPrescription("10–20 minutos").sets).toBe("—");
    expect(original.workouts[4].exercises[3].observation).toContain("banco reto");
    expect(original.workouts[4].exercises[5].observation).toContain("3 × 12");
  });
});
