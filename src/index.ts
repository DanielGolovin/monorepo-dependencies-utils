import {
    createDeepDependencyMap,
    createDeepDependencyTreeMap,
    createProjectsMap,
    createShallowDependencyMap,
} from './dependency-utils/index.js'
import { AbsolutePath, Workspace } from './types.js'

type Config = {
    monorepoRootPath: AbsolutePath
    workspaces: Workspace[]
}

export function getProjectsMap({ workspaces, monorepoRootPath }: Config) {
    return createProjectsMap(monorepoRootPath, workspaces)
}

export function getShallowDependencyMap({
    workspaces,
    monorepoRootPath,
}: Config) {
    const projectsMap = createProjectsMap(monorepoRootPath, workspaces)
    return createShallowDependencyMap(projectsMap)
}

export function getDeepDependencyTreeMap({
    workspaces,
    monorepoRootPath,
}: Config) {
    const projectsMap = createProjectsMap(monorepoRootPath, workspaces)
    const shallowDependencyMap = createShallowDependencyMap(projectsMap)
    return createDeepDependencyTreeMap(shallowDependencyMap)
}

export function getDeepDependencyMap({ workspaces, monorepoRootPath }: Config) {
    const projectsMap = createProjectsMap(monorepoRootPath, workspaces)
    const shallowDependencyMap = createShallowDependencyMap(projectsMap)
    const dependencyTreeMap = createDeepDependencyTreeMap(shallowDependencyMap)

    const deepDependencyMap = createDeepDependencyMap(dependencyTreeMap)

    return deepDependencyMap
}
