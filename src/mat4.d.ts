import type { Mat3, Mat4, Quat, Vec3 } from "./types.ts";
export const mat4: {
  create(): Mat4;
  fromValues(
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number,
  ): Mat4;
  set(
    out: Mat4,
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number,
  ): Mat4;
  copy(out: Mat4, a: Mat4): Mat4;
  identity(out: Mat4): Mat4;
  multiply(out: Mat4, a: Mat4, b: Mat4): Mat4;
  mul(out: Mat4, a: Mat4, b: Mat4): Mat4;
  invert(out: Mat4, a: Mat4): Mat4 | null;
  transpose(out: Mat4, a: Mat4): Mat4;
  fromQuat(out: Mat4, q: Quat): Mat4;
  fromTranslation(out: Mat4, v: Vec3): Mat4;
  fromScaling(out: Mat4, v: Vec3): Mat4;
  fromRotation(out: Mat4, rad: number, axis: Vec3): Mat4;
  getRotation(out: Quat, mat: Mat4): Quat;
  getTranslation(out: Vec3, mat: Mat4): Vec3;
  getScaling(out: Vec3, mat: Mat4): Vec3;
  fromMat3(out: Mat4, m: Mat3): Mat4;
  copyTranslation(out: Mat4, a: Mat4): Mat4;
  setTranslation(out: Mat4, v: Vec3): Mat4;
  setTranslationFromValues(out: Mat4, x: number, y: number, z: number): Mat4;
};
export const copy: (out: Mat4, a: Mat4) => Mat4;
export const create: () => Mat4;
export const identity: (out: Mat4) => Mat4;
export const multiply: (out: Mat4, a: Mat4, b: Mat4) => Mat4;
export const mul: (out: Mat4, a: Mat4, b: Mat4) => Mat4;
