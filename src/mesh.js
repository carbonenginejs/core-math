/**
 * Small mesh rebuild helpers for shared CarbonEngineJS mesh JSON.
 *
 * These helpers are deliberately framework-free and browser-safe. They accept
 * plain arrays or typed arrays and return plain arrays unless otherwise noted.
 */

import { num } from "./num.js";
import { vec3 } from "./vec3.js";

/**
 * Calculate the unit face normal for a triangle.
 *
 * @param {ArrayLike<number>} a First xyz vertex.
 * @param {ArrayLike<number>} b Second xyz vertex.
 * @param {ArrayLike<number>} c Third xyz vertex.
 * @returns {number[]} Unit triangle normal.
 */
export function triangleNormal(a, b, c)
{
    const normal = [ 0, 0, 0 ];
    vec3.cross(
        normal,
        [ b[0] - a[0], b[1] - a[1], b[2] - a[2] ],
        [ c[0] - a[0], c[1] - a[1], c[2] - a[2] ]
    );
    return vec3.normalize(normal, normal);
}

/**
 * Twice the area of a triangle.
 *
 * @param {ArrayLike<number>} a First xyz vertex.
 * @param {ArrayLike<number>} b Second xyz vertex.
 * @param {ArrayLike<number>} c Third xyz vertex.
 * @returns {number} Twice the triangle area.
 */
export function triangleArea2(a, b, c)
{
    const normal = [ 0, 0, 0 ];
    vec3.cross(
        normal,
        [ b[0] - a[0], b[1] - a[1], b[2] - a[2] ],
        [ c[0] - a[0], c[1] - a[1], c[2] - a[2] ]
    );
    return vec3.length(normal);
}

/**
 * Whether a triangle is degenerate.
 *
 * @param {ArrayLike<number>} a First xyz vertex.
 * @param {ArrayLike<number>} b Second xyz vertex.
 * @param {ArrayLike<number>} c Third xyz vertex.
 * @param {number} [epsilon] Area epsilon.
 * @returns {boolean} True when the triangle has no useful area.
 */
export function isDegenerateTriangle(a, b, c, epsilon = 1e-12)
{
    return triangleArea2(a, b, c) <= epsilon;
}

/**
 * Compute axis-aligned bounds from flat xyz positions.
 *
 * @param {ArrayLike<number>} positions Flat xyz positions.
 * @returns {{minBounds: number[], maxBounds: number[]}} Bounds.
 */
export function computeBoundsFromPositions(positions)
{
    if (!positions.length)
    {
        return { minBounds: [ 0, 0, 0 ], maxBounds: [ 0, 0, 0 ] };
    }

    const
        minBounds = [ positions[0], positions[1], positions[2] ],
        maxBounds = [ positions[0], positions[1], positions[2] ];

    for (let i = 3; i < positions.length; i += 3)
    {
        for (let c = 0; c < 3; c++)
        {
            const value = positions[i + c];
            if (value < minBounds[c]) minBounds[c] = value;
            if (value > maxBounds[c]) maxBounds[c] = value;
        }
    }

    return { minBounds, maxBounds };
}

/**
 * Compute axis-aligned bounds from `{ vertices: [[x,y,z], ...] }` triangles.
 *
 * @param {Array<{vertices: Array<ArrayLike<number>>}>} triangles Triangle records.
 * @returns {{minBounds: number[], maxBounds: number[]}} Bounds.
 */
export function computeBoundsFromTriangles(triangles)
{
    if (!triangles.length)
    {
        return { minBounds: [ 0, 0, 0 ], maxBounds: [ 0, 0, 0 ] };
    }

    const
        minBounds = [ Infinity, Infinity, Infinity ],
        maxBounds = [ -Infinity, -Infinity, -Infinity ];

    for (const triangle of triangles)
    {
        for (const vertex of triangle.vertices)
        {
            for (let c = 0; c < 3; c++)
            {
                if (vertex[c] < minBounds[c]) minBounds[c] = vertex[c];
                if (vertex[c] > maxBounds[c]) maxBounds[c] = vertex[c];
            }
        }
    }

    return { minBounds, maxBounds };
}

/**
 * Generate area-weighted vertex normals from positions and triangle indices.
 *
 * @param {ArrayLike<number>} positions Flat xyz positions.
 * @param {ArrayLike<number>} indices Flat triangle indices.
 * @returns {number[]} Flat xyz normals.
 */
export function generateNormals(positions, indices)
{
    const normals = new Array(positions.length).fill(0);

    for (let i = 0; i < indices.length; i += 3)
    {
        const
            ia = indices[i] * 3,
            ib = indices[i + 1] * 3,
            ic = indices[i + 2] * 3,
            ax = positions[ia],
            ay = positions[ia + 1],
            az = positions[ia + 2],
            faceNormal = [ 0, 0, 0 ];

        vec3.cross(
            faceNormal,
            [ positions[ib] - ax, positions[ib + 1] - ay, positions[ib + 2] - az ],
            [ positions[ic] - ax, positions[ic + 1] - ay, positions[ic + 2] - az ]
        );

        for (const offset of [ ia, ib, ic ])
        {
            normals[offset] += faceNormal[0];
            normals[offset + 1] += faceNormal[1];
            normals[offset + 2] += faceNormal[2];
        }
    }

    for (let i = 0; i < normals.length; i += 3)
    {
        const n = vec3.normalize([ 0, 0, 0 ], [ normals[i], normals[i + 1], normals[i + 2] ]);
        normals[i] = n[0];
        normals[i + 1] = n[1];
        normals[i + 2] = n[2];
    }

    return normals;
}

/**
 * Generate per-vertex tangents from positions, normals, UVs and indices.
 *
 * @param {ArrayLike<number>} positions Flat xyz positions.
 * @param {ArrayLike<number>} normals Flat xyz normals.
 * @param {ArrayLike<number>} uvs Flat uv coordinates.
 * @param {ArrayLike<number>} indices Flat triangle indices.
 * @returns {number[]} Flat xyz tangents.
 */
export function generateTangents(positions, normals, uvs, indices)
{
    const
        vertexCount = positions.length / 3,
        tangents = new Array(vertexCount * 3).fill(0);

    for (let i = 0; i < indices.length; i += 3)
    {
        const
            i0 = indices[i],
            i1 = indices[i + 1],
            i2 = indices[i + 2],
            p0 = i0 * 3,
            p1 = i1 * 3,
            p2 = i2 * 3,
            t0 = i0 * 2,
            t1 = i1 * 2,
            t2 = i2 * 2,
            x1 = positions[p1] - positions[p0],
            y1 = positions[p1 + 1] - positions[p0 + 1],
            z1 = positions[p1 + 2] - positions[p0 + 2],
            x2 = positions[p2] - positions[p0],
            y2 = positions[p2 + 1] - positions[p0 + 1],
            z2 = positions[p2 + 2] - positions[p0 + 2],
            s1 = uvs[t1] - uvs[t0],
            v1 = uvs[t1 + 1] - uvs[t0 + 1],
            s2 = uvs[t2] - uvs[t0],
            v2 = uvs[t2 + 1] - uvs[t0 + 1],
            divisor = s1 * v2 - s2 * v1;

        if (Math.abs(divisor) <= num.EPSILON) continue;

        const
            scale = 1 / divisor,
            tx = (v2 * x1 - v1 * x2) * scale,
            ty = (v2 * y1 - v1 * y2) * scale,
            tz = (v2 * z1 - v1 * z2) * scale;

        for (const offset of [ p0, p1, p2 ])
        {
            tangents[offset] += tx;
            tangents[offset + 1] += ty;
            tangents[offset + 2] += tz;
        }
    }

    for (let i = 0; i < tangents.length; i += 3)
    {
        const
            nx = normals[i],
            ny = normals[i + 1],
            nz = normals[i + 2],
            tx = tangents[i],
            ty = tangents[i + 1],
            tz = tangents[i + 2],
            normalDotTangent = nx * tx + ny * ty + nz * tz,
            tangent = vec3.normalize([ 0, 0, 0 ], [
                tx - nx * normalDotTangent,
                ty - ny * normalDotTangent,
                tz - nz * normalDotTangent
            ]);

        tangents[i] = tangent[0];
        tangents[i + 1] = tangent[1];
        tangents[i + 2] = tangent[2];
    }

    return tangents;
}

/**
 * Generate binormals as normalized `normal x tangent`.
 *
 * @param {ArrayLike<number>} normals Flat xyz normals.
 * @param {ArrayLike<number>} tangents Flat xyz tangents.
 * @param {object} [options] Generation options.
 * @param {"right"|"left"} [options.uvHandedness] Handedness of generated basis.
 * @returns {number[]} Flat xyz binormals.
 */
export function generateBiNormals(normals, tangents, { uvHandedness = "right" } = {})
{
    if (normals.length !== tangents.length)
    {
        throw new Error("generateBiNormals requires normals and tangents with matching lengths");
    }

    const
        sign = uvHandedness === "left" ? -1 : 1,
        binormals = new Array(normals.length);

    for (let i = 0; i < normals.length; i += 3)
    {
        const b = vec3.normalize(
            [ 0, 0, 0 ],
            [
                normals[i + 1] * tangents[i + 2] - normals[i + 2] * tangents[i + 1],
                normals[i + 2] * tangents[i] - normals[i] * tangents[i + 2],
                normals[i] * tangents[i + 1] - normals[i + 1] * tangents[i]
            ]
        );
        binormals[i] = b[0] * sign;
        binormals[i + 1] = b[1] * sign;
        binormals[i + 2] = b[2] * sign;
    }

    return binormals;
}

export const mesh = Object.freeze({
    triangleNormal,
    triangleArea2,
    isDegenerateTriangle,
    computeBoundsFromPositions,
    computeBoundsFromTriangles,
    generateNormals,
    generateTangents,
    generateBiNormals
});
