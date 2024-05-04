import {
    ShallowDependencyMap,
    ProjectDeepDependencyTreeMap,
    ProjectName,
    ProjectDeepDependencyTree,
    ProjectWithFlatShallowDepNames,
} from '../types.js'

export function createDeepDependencyTreeMap(
    flatProjectsMap: ShallowDependencyMap
): ProjectDeepDependencyTreeMap {
    const cache = new Map<ProjectName, ProjectDeepDependencyTree>()

    return Object.values(flatProjectsMap).reduce<ProjectDeepDependencyTreeMap>(
        (projectMap, project) => {
            projectMap[project.name] = getDependencyTree(
                project,
                flatProjectsMap,
                cache
            )
            return projectMap
        },
        {}
    )
}

function getDependencyTree(
    project: ProjectWithFlatShallowDepNames,
    projects: ShallowDependencyMap,
    cache: Map<ProjectName, ProjectDeepDependencyTree>
): ProjectDeepDependencyTree {
    if (cache.has(project.name)) {
        return cache.get(project.name)!
    }

    const buildDependencyTree = (
        dependencyNames: ProjectName[]
    ): ProjectDeepDependencyTree[] =>
        dependencyNames.map((dependencyName) => {
            const dependency = projects[dependencyName]
            if (!dependency) {
                throw new Error(
                    `Dependency ${dependencyName} for project ${project.name} does not exist.`
                )
            }
            return getDependencyTree(dependency, projects, cache)
        })

    const dependencyTree: ProjectDeepDependencyTree = {
        path: project.path,
        name: project.name,
        dependencies: buildDependencyTree(project.dependencies),
        devDependencies: buildDependencyTree(project.devDependencies),
        peerDependencies: buildDependencyTree(project.peerDependencies),
    }

    cache.set(project.name, dependencyTree)
    return dependencyTree
}
