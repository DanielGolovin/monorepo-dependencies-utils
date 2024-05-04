import { getDeepDependencyTreeMap } from '../index.js'

import { testDataPath } from './common.js'
import path from 'path'

describe('deep dependency tree map', () => {
    it('should return deep dependency tree map', () => {
        const result = getDeepDependencyTreeMap({
            workspaces: ['apps', 'packages'],
            monorepoRootPath: testDataPath,
        })

        expect(result).toEqual({
            a1: {
                path: expect.stringContaining(`apps${path.sep}a1`),
                name: 'a1',
                dependencies: [
                    {
                        path: expect.stringContaining(`packages${path.sep}p1`),
                        name: 'p1',
                        dependencies: [
                            {
                                path: expect.stringContaining(
                                    `packages${path.sep}p2`
                                ),
                                name: 'p2',
                                dependencies: [],
                                devDependencies: [],
                                peerDependencies: [],
                            },
                        ],
                        devDependencies: [],
                        peerDependencies: [],
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
            a2: {
                path: expect.stringContaining(`apps${path.sep}a2`),
                name: 'a2',
                dependencies: [
                    {
                        path: expect.stringContaining(`packages${path.sep}p3`),
                        name: 'p3',
                        dependencies: [
                            {
                                path: expect.stringContaining(
                                    `packages${path.sep}p1`
                                ),
                                name: 'p1',
                                dependencies: [
                                    {
                                        path: expect.stringContaining(
                                            `packages${path.sep}p2`
                                        ),
                                        name: 'p2',
                                        dependencies: [],
                                        devDependencies: [],
                                        peerDependencies: [],
                                    },
                                ],
                                devDependencies: [],
                                peerDependencies: [],
                            },
                        ],
                        devDependencies: [],
                        peerDependencies: [],
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
            p1: {
                path: expect.stringContaining(`packages${path.sep}p1`),
                name: 'p1',
                dependencies: [
                    {
                        path: expect.stringContaining(`packages${path.sep}p2`),
                        name: 'p2',
                        dependencies: [],
                        devDependencies: [],
                        peerDependencies: [],
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
            p2: {
                path: expect.stringContaining(`packages${path.sep}p2`),
                name: 'p2',
                dependencies: [],
                devDependencies: [],
                peerDependencies: [],
            },
            p3: {
                path: expect.stringContaining(`packages${path.sep}p3`),
                name: 'p3',
                dependencies: [
                    {
                        path: expect.stringContaining(`packages${path.sep}p1`),
                        name: 'p1',
                        dependencies: [
                            {
                                path: expect.stringContaining(
                                    `packages${path.sep}p2`
                                ),
                                name: 'p2',
                                dependencies: [],
                                devDependencies: [],
                                peerDependencies: [],
                            },
                        ],
                        devDependencies: [],
                        peerDependencies: [],
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
        })
    })
})
