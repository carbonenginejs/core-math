export const num: {
  EPSILON: number;
  clamp(a: number, min: number, max: number): number;
  min(a: number, b: number): number;
  roundToZero(a: number): number;
  linearFromSRGB(a: number): number;
  linearToGamma(a: number): number;
};
