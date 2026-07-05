import * as glQuat from "gl-matrix/esm/quat.js";
import { dot as vec3Dot } from "gl-matrix/esm/vec3.js";
import { EPSILON } from "./num.js";
import { pool } from "./pool.js";

const quat = { ...glQuat };

export { quat };

/**
 * Allocates a pooled vec4
 * @returns {Float32Array|quat}
 */
quat.alloc = function()
{
    return pool.allocF32(4);
};

/**
 * Unallocates a pooled vec4
 * @param {Float32Array|quat} a
 */
quat.unalloc = function(a)
{
    pool.freeType(a);
};

/**
 * Creates a quat from unit vectors
 *
 * @param {quat} out
 * @param {vec3} from
 * @param {vec3} to
 * @returns {quat}
 */
quat.fromUnitVectors = function(out, from, to)
{
    let r = vec3Dot(from, to) + 1;
    if (r < EPSILON)
    {
        r = 0;
        if (Math.abs(from[0]) > Math.abs(from[2]))
        {
            out[0] = -from[1];
            out[1] = from[0];
            out[2] = 0;
            out[3] = r;
        }
        else
        {
            out[0] = 0;
            out[1] = - from[2];
            out[2] = from[1];
            out[3] = r;
        }
    }
    else
    {
        out[0] = from[1] * to[2] - from[2] * to[1];
        out[1] = from[2] * to[0] - from[0] * to[2];
        out[2] = from[0] * to[1] - from[1] * to[0];
        out[3] = r;
    }
    return quat.normalize(out, out);
};

export const {
    add,
    calculateW,
    clone,
    conjugate,
    copy,
    create,
    dot,
    equals,
    exactEquals,
    exp,
    fromEuler,
    fromMat3,
    fromValues,
    getAngle,
    getAxisAngle,
    identity,
    invert,
    len,
    length,
    lerp,
    ln,
    mul,
    multiply,
    normalize,
    pow,
    random,
    rotateX,
    rotateY,
    rotateZ,
    rotationTo,
    scale,
    set,
    setAxes,
    setAxisAngle,
    slerp,
    sqlerp,
    sqrLen,
    squaredLength,
    str,
    alloc,
    unalloc,
    fromUnitVectors
} = quat;
