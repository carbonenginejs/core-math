# @carbonenginejs/core-math

Browser-friendly gl-matrix based math containers for CarbonEngineJS packages.
The package exposes small parent containers such as `num`, `vec3`, `mat4`,
`mesh`, and `tangent`, and also supports subpath imports so callers do not need
to import the full math surface.

CarbonEngine and Fenris Creations (CCP Games) are named for provenance and
interoperability context. This package contains no CarbonEngine or Fenris
Creations (CCP Games) source code, shader source, proprietary documentation,
tools, or assets.

## Package

- npm: <https://www.npmjs.com/package/@carbonenginejs/core-math>
- package: `@carbonenginejs/core-math`
- version: `0.1.0`
- license: `MIT`
- runtime: modern browsers, Node `>=18`
- module: ESM
- dependency: `gl-matrix ^3.4.4`

## Install

```sh
npm install @carbonenginejs/core-math
```

## Public API

Prefer direct subpath imports when a package only needs a few math methods:

```js
import { cross, normalize } from "@carbonenginejs/core-math/vec3";

const out = [0, 0, 0];
cross(out, edgeA, edgeB);
normalize(out, out);
```

Subpaths can also be imported as module namespaces:

```js
import * as vec3 from "@carbonenginejs/core-math/vec3";

vec3.cross(out, edgeA, edgeB);
vec3.normalize(out, out);
```

Existing container exports remain available from subpaths while callers migrate:

```js
import { vec3 } from "@carbonenginejs/core-math/vec3";
import { mesh } from "@carbonenginejs/core-math/mesh";
import { tangent } from "@carbonenginejs/core-math/tangent";

vec3.cross(out, edgeA, edgeB);
const n = mesh.generateNormals(positions, indices);
const t = mesh.generateTangents(positions, n, uvs, indices);
const b = mesh.generateBiNormals(n, t);
const packed = tangent.packTangentFrames(n, t, b);
```

Use root imports when several namespaces are needed:

```js
import { num, vec3, mat4, mesh, tangent } from "@carbonenginejs/core-math";

num.clamp(value, 0, 1);
vec3.cross(out, a, b);
vec3.normalize(out, out);
mat4.identity(world);
const packed = tangent.packTangentFrames(normals, tangents, binormals);
```

`vertex` is a legacy compatibility container backed by the shared mesh/tangent
helpers. Its tangent generation intentionally does not preserve the older
ccpwgl `vertex.js` implementation.

## Containers

- `num`: scalar helpers and color/angle conversion helpers.
- `vec2`, `vec3`, `vec4`, `quat`, `mat3`, `mat4`: gl-matrix containers with
  CarbonEngineJS additions.
- `box3`, `tri3`, `lne3`, `pln`, `ray3`, `sph3`: spatial helper containers.
- `pool`: typed-array buffer pool helper.
- `noise`, `curve`: extracted ccpwgl math helpers.
- `mesh`: shared mesh rebuild helpers used by format packages.
- `tangent`: CarbonEngineJS/GR2 packed tangent-frame helpers.
- `vertex`: compatibility names for mesh/tangent generation.
- `geometry`: extracted procedural geometry helpers.

## Browser Rules

Runtime source is plain ESM and must not depend on Node built-ins, filesystem
helpers, CLI tools, webpack aliases, or ccpwgl application globals. Tests may
run in Node, but package code must remain browser-safe.

## Tests

```sh
npm test
```

Tests are self-contained and do not require local asset folders, network
access, or game files.

## License

MIT (see `LICENSE`, `NOTICE`, and `THIRD-PARTY-NOTICES.md`).
