import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { curatedWorkoutGif, photographedWorkoutNames } from "../data/exerciseDemonstrations";
import { anatomicalGifAliases } from "../data/exerciseNameAliases";
import { supplementalExerciseGif } from "../data/supplementalExerciseGifs";
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

  it("corrige exatamente os GIFs ausentes na captura enviada", () => {
    const screenshotNames = [
      ["Supino reto com barra", "pectorals/barbell-bench-press.gif"],
      ["Crossover no cabo", "pectorals/cable-cross-over-variation.gif"],
      ["Desenvolvimento com halteres", "delts/dumbbell-seated-shoulder-press.gif"],
      ["Elevação lateral com halteres", "delts/dumbbell-lateral-raise.gif"],
    ];
    for (const [name, file] of screenshotNames) {
      expect(curatedWorkoutGif(name)).toContain(file);
      expect(curatedWorkoutGif(name.toUpperCase())).toContain(file);
    }
  });

  it("possui catálogo fixo e validável para 118 nomes alternativos em português", () => {
    const uniqueNames = new Set<string>();
    let total = 0;
    for (const group of anatomicalGifAliases) {
      expect(group.file).toMatch(/^[a-z-]+\/[a-z0-9-]+\.gif$/);
      for (const name of group.names) {
        total++;
        expect(uniqueNames.has(name), name).toBe(false);
        uniqueNames.add(name);
        const supplemental = supplementalExerciseGif(name);
        if (supplemental) expect(curatedWorkoutGif(name), name).toBe(supplemental);
        else expect(curatedWorkoutGif(name), name).toContain(group.file);
      }
    }
    expect(total).toBeGreaterThanOrEqual(110);
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
    render(createElement(WorkoutDemonstration, { exercise: makeExercise(
      "Supino inclinado com halteres", "https://example.com/old-photo.jpg", "image",
    ) }));
    const image = screen.getByRole("img", { name: /gif anatômico/i });
    expect(image.getAttribute("src")).toContain("dumbbell-incline-bench-press.gif");
    expect(image.getAttribute("src")).not.toContain("old-photo.jpg");
  });

  it("não exibe foto ou vídeo se não houver demonstração anatômica equivalente", () => {
    render(createElement(WorkoutDemonstration, { exercise: makeExercise(
      "Exercício inexistente xyz", "https://example.com/old-video.mp4", "video",
    ) }));
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("GIF anatômico não disponível");
  });

  it("não cria URLs externas arbitrárias para exercícios desconhecidos", () => {
    expect(curatedWorkoutGif("Exercício inexistente xyz")).toBeNull();
  });
});
