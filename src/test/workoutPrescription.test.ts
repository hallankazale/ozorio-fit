import { describe, expect, it } from "vitest";
import { readWorkoutPrescription } from "../utils/workoutPrescription";

describe("Formatação do guia anatômico", () => {
  it("separa séries e repetições da ficha pessoal para os quatro cartões", () => {
    expect(readWorkoutPrescription("3 × 10–12")).toEqual({ sets: "3", reps: "10–12" });
    expect(readWorkoutPrescription("4x15")).toEqual({ sets: "4", reps: "15" });
    expect(readWorkoutPrescription("3 × 10 por perna")).toEqual({ sets: "3", reps: "10 por perna" });
  });
  it("não trata minutos de cardio como séries", () => {
    expect(readWorkoutPrescription("10–15 minutos")).toEqual({ sets: "—", reps: "10–15 minutos" });
  });
});
