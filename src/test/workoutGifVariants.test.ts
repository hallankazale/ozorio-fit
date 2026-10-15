import { createElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getWorkoutGifVariants } from "../data/workoutGifVariants";
import { WorkoutDemonstration } from "../components/WorkoutDemonstration";
import type { WorkoutExercise } from "../services/workoutService";

function exercise(name: string): WorkoutExercise {
  return {
    id: "test-variant", program_id: "program", position: 1, name,
    muscle_group: "Pernas", sets: 3, reps_min: 10, reps_max: 12,
    suggested_load_kg: null, rest_seconds: 90, notes: "",
    media_url: null, media_type: "none", media_attribution: "",
  };
}

describe("Variações anatômicas sem trocar aparelhos", () => {
  it("disponibiliza hack e leg press separadamente quando a ficha diz OU", () => {
    expect(getWorkoutGifVariants("HACK SQUAT OU LEG PRESS").map(x => x.label))
      .toEqual(["Hack squat", "Leg press 45°"]);
    render(createElement(WorkoutDemonstration, { exercise: exercise("Hack squat ou leg press") }));
    const first = screen.getByRole("img", { name: /variação Hack squat/i });
    expect(first.getAttribute("src")).toContain("sled-hack-squat.gif");
    fireEvent.click(screen.getByRole("button", { name: "Leg press 45°" }));
    expect(screen.getByRole("img", { name: /variação Leg press 45°/i }).getAttribute("src"))
      .toContain("sled-45-leg-press.gif");
  });

  it("não exibe seletor para exercício e equipamento já definidos", () => {
    render(createElement(WorkoutDemonstration, { exercise: exercise("Supino reto com barra") }));
    expect(screen.queryByRole("group", { name: "Escolher variação do exercício" })).toBeNull();
    expect(screen.getByRole("img").getAttribute("src")).toContain("barbell-bench-press.gif");
  });
});
