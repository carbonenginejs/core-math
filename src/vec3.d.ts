import type { Vec3, Quat } from "./types.ts";
export const vec3: {
  create(): Vec3;
  fromValues(x: number, y: number, z: number): Vec3;
  copy<T extends Vec3>(out: T, a: Vec3): T;
  add(out: Vec3, a: Vec3, b: Vec3): Vec3;
  subtract(out: Vec3, a: Vec3, b: Vec3): Vec3;
  scale(out: Vec3, a: Vec3, s: number): Vec3;
  scaleAndAdd(out: Vec3, a: Vec3, b: Vec3, scale: number): Vec3;
  dot(a: Vec3, b: Vec3): number;
  length(a: Vec3): number;
  lerp(out: Vec3, a: Vec3, b: Vec3, t: number): Vec3;
  hermite<T extends Vec3>(
    out: T,
    a: Vec3,
    b: Vec3,
    c: Vec3,
    d: Vec3,
    t: number,
  ): T;
  transformQuat(out: Vec3, a: Vec3, q: Quat): Vec3;
  zero(out: Vec3): Vec3;
  fromSRGB<T extends Vec3>(out: T, srgb: Vec3): T;
  linearFromSRGB<T extends Vec3>(out: T, srgb: Vec3): T;
  toSRGB<T extends Vec3>(out: T, linear: Vec3): T;
  srgbFromLinear<T extends Vec3>(out: T, linear: Vec3): T;
  linearToGamma<T extends Vec3>(out: T, linear: Vec3): T;
  gammaToLinear<T extends Vec3>(out: T, gamma: Vec3): T;
};
