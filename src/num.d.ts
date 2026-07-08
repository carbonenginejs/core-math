export const num: {
  EPSILON: number;
  clamp(a: number, min: number, max: number): number;
  min(a: number, b: number): number;
  roundToZero(a: number): number;
  hermite(a: number, b: number, c: number, d: number, t: number): number;
  hermiteDerivative(a: number, b: number, c: number, d: number, t: number): number;
  linearFromSRGB(a: number): number;
  linearToGamma(a: number): number;
  gammaToLinear(a: number): number;
  srgbFromLinear(a: number): number;
};
