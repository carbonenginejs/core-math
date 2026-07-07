import type { Vec3, Quat } from "./types.ts";
export const vec3: {
  create(): Vec3;
  fromValues(x: number, y: number, z: number): Vec3;
  copy(out: Vec3, a: Vec3): Vec3;
  add(out: Vec3, a: Vec3, b: Vec3): Vec3;
  subtract(out: Vec3, a: Vec3, b: Vec3): Vec3;
  scale(out: Vec3, a: Vec3, s: number): Vec3;
  scaleAndAdd(out: Vec3, a: Vec3, b: Vec3, scale: number): Vec3;
  dot(a: Vec3, b: Vec3): number;
  length(a: Vec3): number;
  lerp(out: Vec3, a: Vec3, b: Vec3, t: number): Vec3;
  transformQuat(out: Vec3, a: Vec3, q: Quat): Vec3;
  zero(out: Vec3): Vec3;
};
