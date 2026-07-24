# @carbonenginejs/runtime-utils

Browser-safe foundations shared across CarbonEngineJS packages.

The package owns:

- neutral arrays, bytes, compression, JSON, lookup, paths, text, predicates,
  and validation;
- scalar, vector, quaternion, matrix, geometry, mesh, tangent, curve, and
  noise math;
- shared media, graphics, render-context, audio, shader, D3D, and WebGPU
  constants;
- Carbon type descriptors, schema metadata, models, lifecycle state,
  documents, hydration, and dehydration.

Browser clients remain in `@carbonenginejs/tools-browser`; Node automation
remains in `@carbonenginejs/tools-core`.

## Install

```sh
npm install @carbonenginejs/runtime-utils
```

## Quick start

Prefer direct subpaths so unrelated families are not initialized:

```js
import { normalizePath } from "@carbonenginejs/runtime-utils/path";
import { cross, normalize } from "@carbonenginejs/runtime-utils/vec3";
import { PixelFormat } from "@carbonenginejs/runtime-utils/graphics";
import { CjsSchema } from "@carbonenginejs/runtime-utils/schema";
```

Former core-math and runtime-const subpaths remain top-level, so migration is
a package-name replacement. Carbon type and model primitives are available
from `/types`, `/schema`, `/model`, `/document`, `/hydration`, and
`/lifecycle`.

The root export is intentionally limited to common neutral utilities, math,
and non-conflicting constants. Import Carbon type/model/document families from
their direct subpaths.

## Documentation

- [Package documentation](docs/README.md)
- [Architecture and admission rules](docs/architecture.md)
- [API reference](docs/reference/api.md)
- [Foundation consolidation](docs/concepts/foundation-consolidation.md)
- [Constant vocabulary notes](docs/const-kb.md)

## License

MIT. See [LICENSE](LICENSE), [NOTICE](NOTICE), and
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
