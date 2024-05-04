# Monorepo Dependencies Utils

This package provides utility functions for creating dependency management tools tailored for monorepos.
It offers functionality to generate maps of project dependencies and their trees, both shallow and deep.

## Overview

`getProjectsMap`
Generates a map of projects within the monorepo, including their paths and package.jsons.

`getShallowDependencyMap`
Creates a shallow dependency map for projects within the monorepo, showing immediate dependencies.

`getDeepDependencyTreeMap`
Generates a deep dependency tree map for projects within the monorepo, illustrating dependencies recursively.

`getDeepDependencyMap`
Generates a deep dependency map for projects within the monorepo, showcasing all dependencies.

## Installation

```bash
npm install monorepo-dependencies-utils
```

## Usage

```js
import { getDeepDependencyMap } from 'monorepo-dependencies-utils'

const workspaces = ['packages', 'apps']
const monorepoRootPath = '/path/to/your/monorepo/root'
const deepDependencyMap = getDeepDependencyMap({
    workspaces,
    monorepoRootPath,
})
```

For examples, if you have a monorepo with the following structure:

```
monorepo-root
├── apps
│   ├── app1
│   └── app2
└── packages
    ├── package1
    └── package2
    └── package3
```

where:
`app1` depends on `package1`
`app2` depends on `package3`
`package1` depends on `package2`
`package3` depends on `package1`

The `deepDependencyMap` will be:

```json
{
    "a1": {
        "name": "a1",
        "path": "...",
        "dependencies": [
            {
                "name": "p1",
                "path": "..."
            },
            {
                "name": "p2",
                "path": "..."
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    },
    "a2": {
        "name": "a2",
        "path": "...",
        "dependencies": [
            {
                "name": "p3",
                "path": "..."
            },
            {
                "name": "p1",
                "path": "..."
            },
            {
                "name": "p2",
                "path": "..."
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    },
    "p1": {
        "name": "p1",
        "path": "...",
        "dependencies": [
            {
                "name": "p2",
                "path": "..."
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    },
    "p2": {
        "name": "p2",
        "path": "...",
        "dependencies": [],
        "devDependencies": [],
        "peerDependencies": []
    },
    "p3": {
        "name": "p3",
        "path": "...",
        "dependencies": [
            {
                "name": "p1",
                "path": "..."
            },
            {
                "name": "p2",
                "path": "..."
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    }
}
```

check [tests](./src/tests) for other function examples.
