import { describe, expect, it } from "vitest";
import { curatedWorkoutGif } from "../data/exerciseDemonstrations";

describe("Catálogo de demonstrações", () => {
  it("mapeia nomes da ficha fotografada para GIFs de execução", () => {
    expect(curatedWorkoutGif("PUXADA ALTA FRENTE")).toContain("lats/lever-front-pulldown.gif");
    expect(curatedWorkoutGif("TRÍCEPS CORDA")).toContain("triceps/cable-pushdown-with-rope-attachment.gif");
    expect(curatedWorkoutGif("PECK DECK")).toContain("pectorals/lever-seated-fly.gif");
  });

  it("não inventa GIF para exercício desconhecido", () => {
    expect(curatedWorkoutGif("Exercício inexistente xyz")).toBeNull();
  });
});
