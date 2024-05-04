import path from 'path'
import { getProjectsMap } from '../index.js'
import { testDataPath } from './common.js'

describe('projects map', () => {
    it('should return projects map', () => {
        const result = getProjectsMap({
            workspaces: ['apps', 'packages'],
            monorepoRootPath: testDataPath,
        })

        expect(result).toEqual({
            a1: {
                path: expect.stringContaining(`apps${path.sep}a1`),
                packageJSON: {
                    name: 'a1',
                    dependencies: {
                        p1: '',
                    },
                },
            },
            a2: {
                path: expect.stringContaining(`apps${path.sep}a2`),
                packageJSON: {
                    name: 'a2',
                    dependencies: {
                        p3: '',
                    },
                },
            },
            p1: {
                path: expect.stringContaining(`packages${path.sep}p1`),
                packageJSON: {
                    name: 'p1',
                    dependencies: {
                        p2: '',
                    },
                },
            },
            p2: {
                path: expect.stringContaining(`packages${path.sep}p2`),
                packageJSON: {
                    name: 'p2',
                    dependencies: {},
                },
            },
            p3: {
                path: expect.stringContaining(`packages${path.sep}p3`),
                packageJSON: {
                    name: 'p3',
                    dependencies: {
                        p1: '',
                    },
                },
            },
        })
    })
})
