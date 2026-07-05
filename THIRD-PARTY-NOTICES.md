# Third-Party Notices

## gl-matrix

This package depends on `gl-matrix` and extends its vector, quaternion, and
matrix containers with CarbonEngineJS helpers.

- Project: <https://github.com/toji/gl-matrix>
- License: MIT

## ccpwgl math extraction

Most container modules in `src` were extracted from ccpwgl's
`src/global/math` library and converted to standalone ESM with package-local
imports. The code remains MIT-licensed under the CarbonEngineJS/ccpwgl project
license.

## Mapbox earcut helper

`src/geometry/helpers/earcut.js` is an embedded copy of an Earcut-style
triangulation helper from the ccpwgl math tree.

- Copyright: 2016, Mapbox
- License: ISC
- Local license copy: `src/geometry/helpers/LICENSE`

## Three.js-derived geometry notes

Some geometry helpers in the extracted ccpwgl math tree are marked as converted
from Three.js-style algorithms. These are retained as source comments and should
be reviewed before expanding the public geometry surface.

## Fenris Creations / CCP Games tangent behavior

`src/tangent.js` implements CarbonEngineJS/GR2 packed tangent-frame behavior
derived from observed EVE/Carbon shader behavior and generated test vectors.
No Fenris Creations (CCP Games) shader source, tools, or assets are included.

