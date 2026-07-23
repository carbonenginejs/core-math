import type { Vec4 } from "./types.ts";

export interface PerlinNoise1D {
  sample(x: number): number;
  fractalSum(
    x: number,
    octaves: number,
    amplitudeScale?: number,
    frequencyScale?: number,
  ): number;
}

export const noise: {
  turbulence(
    out: Vec4,
    pos0: number,
    pos1: number,
    pos2: number,
    pos3: number,
    power: number,
  ): Vec4;
  createPerlinNoise1D(seed?: number): PerlinNoise1D;
  carbonPerlin1D(x: number, inverseAmplitude: number, frequency: number, octaves: number): number;
  perlin1(a: number): number;
  perlin1D(x: number, alpha: number, beta: number, n: number): number;
};
export const turbulence: typeof noise.turbulence;
export const createPerlinNoise1D: typeof noise.createPerlinNoise1D;
export const carbonPerlin1D: typeof noise.carbonPerlin1D;
export const perlin1: typeof noise.perlin1;
export const perlin1D: typeof noise.perlin1D;
