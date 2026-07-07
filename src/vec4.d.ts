import type { Vec4 } from "./types.ts";
export const vec4: {
  create(): Vec4;
  fromValues(x: number, y: number, z: number, w: number): Vec4;
  set(out: Vec4, x: number, y: number, z: number, w: number): Vec4;
  copy(out: Vec4, a: Vec4): Vec4;
  lerp(out: Vec4, a: Vec4, b: Vec4, t: number): Vec4;
  max(out: Vec4, a: Vec4, b: Vec4): Vec4;
  scale(out: Vec4, a: Vec4, s: number): Vec4;
  zero(out: Vec4): Vec4;
};
