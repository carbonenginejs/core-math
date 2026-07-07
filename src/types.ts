// Shared value types for @carbonenginejs/core-math.
//
// Every core-math vector, quaternion, and matrix is a Float32Array (gl-matrix
// storage). These aliases give those shapes readable names so consumers and
// generated classes import them here instead of re-declaring
// `type Vec3 = Float32Array` in every file.
//
// Type-only module: `import type { Vec3 } from "@carbonenginejs/core-math/types"`.
export type Vec2 = Float32Array;
export type Vec3 = Float32Array;
export type Vec4 = Float32Array;
export type Quat = Float32Array;
export type Mat3 = Float32Array;
export type Mat4 = Float32Array;
export type Color = Vec4;
