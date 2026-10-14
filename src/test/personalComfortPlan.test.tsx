import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PersonalComfortPlan } from "../components/PersonalComfortPlan";
import { personalComfortWorkouts, personalExerciseGifUrl } from "../data/personalComfortPlan";

describe("Ficha particular confortável A–E", () => {
  it("contém cinco treinos e GIFs específicos para todos os movimentos", () => {
    expect(personalComfortWorkouts.map((w) => w.code)).toEqual(["A", "B", "C", "D", "E"]);
    const ids = personalComfortWorkouts.flatMap((w) => w.exercises.map((e) => e.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const workout of personalComfortWorkouts) {
      expect(workout.exercises.length).toBeGreaterThanOrEqual(6);
      for (const exercise of workout.exercises) {
        expect(exercise.name).not.toMatch(/agachamento|mesa flexora|hiperextensão|prancha/i);
        expect(exercise.prescription.length).toBeGreaterThan(2);
        expect(personalExerciseGifUrl(exercise)).toMatch(/^https:\/\/cdn\.jsdelivr\.net\/gh\/.+\.gif$/);
      }
    }
  });

  it("troca mesa flexora deitado por cadeira flexora no C", () => {
    const c = personalComfortWorkouts.find((w) => w.code === "C");
    expect(c?.exercises[0].name).toBe("Cadeira flexora sentada");
    expect(c?.exercises[0].gifFile).toBe("hamstrings/lever-seated-leg-curl.gif");
  });

  it("permite alternar treinos e marcar exercícios sem tocar nas prescrições do professor", () => {
    render(<PersonalComfortPlan accountId="test-personal-plan" />);
    expect(screen.getByText("Pernas e abdômen")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Treino C" }));
    expect(screen.getByText("Posterior de coxa e glúteos")).toBeInTheDocument();
    const buttons = screen.getAllByRole("button", { name: "Marcar como feito" });
    fireEvent.click(buttons[0]);
    expect(screen.getByText("1 de 6 feitos")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Feito hoje · desfazer" })).toHaveLength(1);
  });
});
