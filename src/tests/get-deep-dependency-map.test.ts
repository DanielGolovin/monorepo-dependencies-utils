import path from 'path'
import { getDeepDependencyMap } from '../index.js'
import { testDataPath } from './common.js'

describe('deep dependency map', () => {
    it('should return deep dependency map', () => {
        const result = getDeepDependencyMap({
            workspaces: ['apps', 'packages'],
            monorepoRootPath: testDataPath,
        })

        expect(result).toEqual({
            a1: {
                name: 'a1',
                path: expect.stringContaining(`apps${path.sep}a1`),
                dependencies: [
                    {
                        name: 'p1',
                        path: expect.stringContaining(`packages${path.sep}p1`),
                    },
                    {
                        name: 'p2',
                        path: expect.stringContaining(`packages${path.sep}p2`),
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
            a2: {
                name: 'a2',
                path: expect.stringContaining(`apps${path.sep}a2`),
                dependencies: [
                    {
                        name: 'p3',
                        path: expect.stringContaining(`packages${path.sep}p3`),
                    },
                    {
                        name: 'p1',
                        path: expect.stringContaining(`packages${path.sep}p1`),
                    },
                    {
                        name: 'p2',
                        path: expect.stringContaining(`packages${path.sep}p2`),
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
            p1: {
                name: 'p1',
                path: expect.stringContaining(`packages${path.sep}p1`),
                dependencies: [
                    {
                        name: 'p2',
                        path: expect.stringContaining(`packages${path.sep}p2`),
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
            p2: {
                name: 'p2',
                path: expect.stringContaining(`packages${path.sep}p2`),
                dependencies: [],
                devDependencies: [],
                peerDependencies: [],
            },
            p3: {
                name: 'p3',
                path: expect.stringContaining(`packages${path.sep}p3`),
                dependencies: [
                    {
                        name: 'p1',
                        path: expect.stringContaining(`packages${path.sep}p1`),
                    },
                    {
                        name: 'p2',
                        path: expect.stringContaining(`packages${path.sep}p2`),
                    },
                ],
                devDependencies: [],
                peerDependencies: [],
            },
        })
    })
})
