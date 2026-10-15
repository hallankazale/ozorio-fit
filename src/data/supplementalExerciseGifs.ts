/**
 * Conjunto suplementar em português quando o catálogo primário não contém
 * o equipamento/variação exato. Todos os arquivos foram conferidos pelo caminho
 * na árvore do repositório no commit fixo indicado abaixo.
 *
 * Fonte: klaudiotucson/banco-de-exercicios-gif (GitHub público).
 * Direitos autorais das animações permanecem com seus autores.
 * Não copiar os GIFs para o projeto sem licença explícita.
 */
const SOURCE_COMMIT = "f1805e75b207116f5fe8226842e2d86b1652b73b";
const SOURCE_URL = `https://raw.githubusercontent.com/klaudiotucson/banco-de-exercicios-gif/${SOURCE_COMMIT}/`;

export const supplementalExerciseGifs: ReadonlyArray<readonly [string, string]> = [
  [
    "face pull no cabo",
    "cable-face-pull (1).gif"
  ],
  [
    "face pull",
    "Facepull (1).gif"
  ],
  [
    "facepull",
    "Facepull (1).gif"
  ],
  [
    "agachamento sumo halteres",
    "Agachamento sumo com halteres (3).gif"
  ],
  [
    "agachamento sumo com halteres",
    "Agachamento sumo com halteres (3).gif"
  ],
  [
    "agachamento sumo com halter",
    "Agachamento sumo com halter (1).gif"
  ],
  [
    "leg 180",
    "Leg press horizontal (1).gif"
  ],
  [
    "leg press 180",
    "Leg press horizontal (1).gif"
  ],
  [
    "leg press 180 graus",
    "Leg press horizontal (1).gif"
  ],
  [
    "leg press horizontal",
    "Leg press horizontal (1).gif"
  ],
  [
    "leg press horizontal maquina",
    "Leg press horizontal (1).gif"
  ],
  [
    "hip thrust com barra",
    "Hip thrust (1).gif"
  ],
  [
    "rosca martelo alternada",
    "Rosca martelo alternada (1).gif"
  ],
  [
    "stiff",
    "stiff com barra (1).gif"
  ],
  [
    "stiff com barra",
    "stiff com barra (1).gif"
  ],
  [
    "stiff com halteres",
    "Stiff com Halteres (1).gif"
  ]
];

function normalize(name: string): string {
  return name.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

const lookup = new Map(supplementalExerciseGifs.map(([name, file]) => [normalize(name), file]));

export function supplementalExerciseGif(name: string): string | null {
  const file = lookup.get(normalize(name));
  return file ? SOURCE_URL + encodeURIComponent(file) : null;
}
