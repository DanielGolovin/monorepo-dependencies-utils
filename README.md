# Monorepo Dependencies Utils

This package provides utility functions to manage dependencies within a monorepo environment. It includes functionality to create maps of project dependencies and their trees, both shallow and deep.

## Installation

```bash
npm install monorepo-dependencies-utils
```

## Usage

```js
import { 
    getDeepDependencyMap 
} from 'monorepo-dependencies-utils';

const workspaces = ['packages', 'apps'];
const monorepoRootPath = '/path/to/your/monorepo/root';
const deepDependencyMap = getDeepDependencyMap({
    workspaces, 
    monorepoRootPath
});
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
        "path": "...",
        "name": "a1",
        "dependencies": [
            {
                "path": "...",
                "name": "p1",
                "dependencies": [
                    {
                        "path": "...",
                        "name": "p2",
                        "dependencies": [],
                        "devDependencies": [],
                        "peerDependencies": []
                    }
                ],
                "devDependencies": [],
                "peerDependencies": []
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    },
    "a2": {
        "path": "...",
        "name": "a2",
        "dependencies": [
            {
                "path": "...",
                "name": "p3",
                "dependencies": [
                    {
                        "path": "...",
                        "name": "p1",
                        "dependencies": [
                            {
                                "path": "...",
                                "name": "p2",
                                "dependencies": [],
                                "devDependencies": [],
                                "peerDependencies": []
                            }
                        ],
                        "devDependencies": [],
                        "peerDependencies": []
                    }
                ],
                "devDependencies": [],
                "peerDependencies": []
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    },
    "p1": {
        "path": "...",
        "name": "p1",
        "dependencies": [
            {
                "path": "...",
                "name": "p2",
                "dependencies": [],
                "devDependencies": [],
                "peerDependencies": []
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    },
    "p2": {
        "path": "...",
        "name": "p2",
        "dependencies": [],
        "devDependencies": [],
        "peerDependencies": []
    },
    "p3": {
        "path": "...",
        "name": "p3",
        "dependencies": [
            {
                "path": "...",
                "name": "p1",
                "dependencies": [
                    {
                        "path": "...",
                        "name": "p2",
                        "dependencies": [],
                        "devDependencies": [],
                        "peerDependencies": []
                    }
                ],
                "devDependencies": [],
                "peerDependencies": []
            }
        ],
        "devDependencies": [],
        "peerDependencies": []
    }
}
```