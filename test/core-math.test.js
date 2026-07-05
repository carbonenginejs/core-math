import assert from "node:assert/strict";
import test from "node:test";

import { mesh, num, tangent, vec3 as rootVec3, vertex } from "@carbonenginejs/core-math";
import { mesh as subMesh } from "@carbonenginejs/core-math/mesh";
import { tangent as subTangent } from "@carbonenginejs/core-math/tangent";
import { cross, normalize, vec3 as vec3Container } from "@carbonenginejs/core-math/vec3";
import * as vec3 from "@carbonenginejs/core-math/vec3";

const
    POSITIONS = [
        0, 0, 0,
        1, 0, 0,
        0, 1, 0
    ],
    UVS = [
        0, 0,
        1, 0,
        0, 1
    ],
    INDICES = [ 0, 1, 2 ];

function almostEqualArray(actual, expected, epsilon = 1e-6)
{
    assert.equal(actual.length, expected.length);
    for (let i = 0; i < actual.length; i++)
    {
        assert.ok(Math.abs(actual[i] - expected[i]) <= epsilon, `${i}: expected ${expected[i]}, got ${actual[i]}`);
    }
}

test("root and subpath imports expose individual methods and containers", () =>
{
    assert.equal(rootVec3.cross, cross);
    assert.equal(rootVec3.normalize, normalize);
    assert.equal(vec3.cross, cross);
    assert.equal(vec3.normalize, normalize);
    assert.equal(vec3.vec3, vec3Container);
    assert.equal(vec3Container.cross, cross);
    assert.equal(mesh.generateNormals, subMesh.generateNormals);
    assert.equal(tangent.packTangentFrames, subTangent.packTangentFrames);
    assert.equal(num.clamp(2, 0, 1), 1);

    const
        out = [ 0, 0, 0 ],
        unit = [ 0, 0, 0 ];

    cross(out, [ 1, 0, 0 ], [ 0, 1, 0 ]);
    normalize(unit, [ 0, 0, 2 ]);
    assert.deepEqual(out, [ 0, 0, 1 ]);
    assert.deepEqual(unit, [ 0, 0, 1 ]);
});

test("mesh generates normals, tangents, and binormals", () =>
{
    const
        normals = mesh.generateNormals(POSITIONS, INDICES),
        tangents = mesh.generateTangents(POSITIONS, normals, UVS, INDICES),
        binormals = mesh.generateBiNormals(normals, tangents);

    almostEqualArray(normals, [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ]);
    almostEqualArray(tangents, [
        1, 0, 0,
        1, 0, 0,
        1, 0, 0
    ]);
    almostEqualArray(binormals, [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ]);
});

test("vertex compatibility delegates to shared mesh math", () =>
{
    almostEqualArray(
        vertex.calculateTangents(INDICES, POSITIONS, UVS),
        mesh.generateTangents(POSITIONS, mesh.generateNormals(POSITIONS, INDICES), UVS, INDICES)
    );
});

test("tangent packs and decodes a GR2-style tangent frame", () =>
{
    const
        normals = mesh.generateNormals(POSITIONS, INDICES),
        tangents = mesh.generateTangents(POSITIONS, normals, UVS, INDICES),
        binormals = mesh.generateBiNormals(normals, tangents),
        packed = tangent.packTangentFrames(normals, tangents, binormals),
        decoded = tangent.decodeTangentFrame(packed.slice(0, 4));

    assert.equal(packed.length, 12);
    assert.equal(decoded.null, false);
    almostEqualArray(decoded.T, [ 1, 0, 0 ], 1e-5);
    almostEqualArray(decoded.B, [ 0, 1, 0 ], 1e-5);
    almostEqualArray(decoded.N, [ 0, 0, 1 ], 1e-5);
});
