export const num: {
  EPSILON: number;
  clamp(a: number, min: number, max: number): number;
  min(a: number, b: number): number;
  roundToZero(a: number): number;
  cubicHermite(
    startValue: number,
    startTangent: number,
    endValue: number,
    endTangent: number,
    amount: number
  ): number;
  cubicHermiteDerivative(
    startValue: number,
    startTangent: number,
    endValue: number,
    endTangent: number,
    amount: number
  ): number;
  linearFromSRGB(a: number): number;
  linearToGamma(a: number): number;
  gammaToLinear(a: number): number;
  srgbFromLinear(a: number): number;
};
