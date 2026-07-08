import type { Quat, Vec3 } from "./types.ts";
export const quat: {
  create(): Quat;
  fromValues(x: number, y: number, z: number, w: number): Quat;
  set(out: Quat, x: number, y: number, z: number, w: number): Quat;
  copy(out: Quat, a: Quat): Quat;
  identity(out: Quat): Quat;
  multiply(out: Quat, a: Quat, b: Quat): Quat;
  mul(out: Quat, a: Quat, b: Quat): Quat;
  normalize(out: Quat, a: Quat): Quat;
  setAxisAngle(out: Quat, axis: Vec3, rad: number): Quat;
  slerp(out: Quat, a: Quat, b: Quat, t: number): Quat;
  fromYawPitchRoll(out: Quat, yaw: number, pitch: number, roll: number): Quat;
};
export const multiply: (out: Quat, a: Quat, b: Quat) => Quat;
export const mul: (out: Quat, a: Quat, b: Quat) => Quat;
export const normalize: (out: Quat, a: Quat) => Quat;
export const fromYawPitchRoll: (out: Quat, yaw: number, pitch: number, roll: number) => Quat;
