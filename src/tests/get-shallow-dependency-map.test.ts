import { getShallowDependencyMap } from '../index.js'
import { testDataPath } from './common.js'
import path from 'path'

describe('shallow dependency map', () => {
    it('should return shallow dependency map', () => {
        const result = getShallowDependencyMap({
            workspaces: ['apps', 'packages'],
            monorepoRootPath: testDataPath,
        })

        expect(result).toEqual({
            a1: {
                name: 'a1',
                path: expect.stringContaining(`apps${path.sep}a1`),
                dependencies: ['p1'],
                devDependencies: [],
                peerDependencies: [],
            },
            a2: {
                name: 'a2',
                path: expect.stringContaining(`apps${path.sep}a2`),
                dependencies: ['p3'],
                devDependencies: [],
                peerDependencies: [],
            },
            p1: {
                name: 'p1',
                path: expect.stringContaining(`packages${path.sep}p1`),
                dependencies: ['p2'],
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
                dependencies: ['p1'],
                devDependencies: [],
                peerDependencies: [],
            },
        })
    })
})
