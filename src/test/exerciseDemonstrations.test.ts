import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { curatedWorkoutGif, photographedWorkoutNames } from "../data/exerciseDemonstrations";
import { WorkoutDemonstration } from "../components/WorkoutDemonstration";
import type { WorkoutExercise } from "../services/workoutService";

function makeExercise(name: string, mediaUrl: string, mediaType: WorkoutExercise["media_type"]): WorkoutExercise {
  return {
    id: "exercise-test", program_id: "program-test", position: 1, name,
    muscle_group: "Peitoral", sets: 3, reps_min: 8, reps_max: 12,
    suggested_load_kg: null, rest_seconds: 90, notes: "",
    media_url: mediaUrl, media_type: mediaType, media_attribution: "Foto original",
  };
}

describe("GIFs anatômicos padronizados", () => {
  it("mapeia todos os movimentos identificados nas 12 fotos originais", () => {
    for (const name of photographedWorkoutNames) {
      expect(curatedWorkoutGif(name), `GIF ausente: ${name}`).toMatch(/\.gif$/);
    }
  });

  it("distingue máquina de halteres para não ensinar um movimento errado", () => {
    expect(curatedWorkoutGif("Supino inclinado com halteres"))
      .toContain("pectorals/dumbbell-incline-bench-press.gif");
    expect(curatedWorkoutGif("Supino inclinado máquina"))
      .toContain("pectorals/lever-incline-chest-press.gif");
    expect(curatedWorkoutGif("Tríceps corda"))
      .toContain("triceps/cable-pushdown-with-rope-attachment.gif");
  });

  it("ignora foto antiga e prefere GIF anatômico do catálogo", () => {
    render(<WorkoutDemonstration exercise={makeExercise(
      "Supino inclinado com halteres", "https://example.com/old-photo.jpg", "image",
    )} />);
    const image = screen.getByRole("img", { name: /gif anatômico/i });
    expect(image.getAttribute("src")).toContain("dumbbell-incline-bench-press.gif");
    expect(image.getAttribute("src")).not.toContain("old-photo.jpg");
  });

  it("não exibe foto ou vídeo se não houver demonstração anatômica equivalente", () => {
    render(<WorkoutDemonstration exercise={makeExercise(
      "Exercício inexistente xyz", "https://example.com/old-video.mp4", "video",
    )} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("GIF anatômico não disponível");
  });

  it("não cria URLs externas arbitrárias para exercícios desconhecidos", () => {
    expect(curatedWorkoutGif("Exercício inexistente xyz")).toBeNull();
  });
});
