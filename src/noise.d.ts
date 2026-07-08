import type { Vec4 } from "./types.ts";

export const noise: {
  turbulence(
    out: Vec4,
    pos0: number,
    pos1: number,
    pos2: number,
    pos3: number,
    power: number,
  ): Vec4;
  perlin1(a: number): number;
  perlin1D(x: number, alpha: number, beta: number, n: number): number;
};
export const turbulence: typeof noise.turbulence;
export const perlin1: typeof noise.perlin1;
export const perlin1D: typeof noise.perlin1D;
