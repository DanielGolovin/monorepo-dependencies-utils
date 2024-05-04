import {
    ProjectDeepDependencyTreeMap,
    DeepDependencyMap,
    ProjectDeepDependencyTree,
    DependencyType,
    ProjectBase,
    ProjectName,
} from '../types.js'

export function createDeepDependencyMap(
    nestedProjectMap: ProjectDeepDependencyTreeMap
): DeepDependencyMap {
    return Object.entries(nestedProjectMap).reduce<DeepDependencyMap>(
        (projectMap, [name, project]) => {
            projectMap[name] = {
                name,
                path: project.path,
                dependencies: getUniqueProjects(project, 'dependencies'),
                devDependencies: getUniqueProjects(project, 'devDependencies'),
                peerDependencies: getUniqueProjects(
                    project,
                    'peerDependencies'
                ),
            }

            return projectMap
        },
        {}
    )
}

function getUniqueProjects(
    project: ProjectDeepDependencyTree,
    key: DependencyType
): ProjectBase[] {
    const seenNames = new Set<ProjectName>()
    const result: ProjectBase[] = []
    const depStack: ProjectDeepDependencyTree[] = [...project[key]]

    while (depStack.length) {
        const currentProject = depStack.pop()
        if (!currentProject || seenNames.has(currentProject.name)) continue

        seenNames.add(currentProject.name)
        depStack.push(
            ...currentProject.dependencies,
            ...currentProject.peerDependencies,
            ...currentProject.devDependencies
        )

        result.push({ name: currentProject.name, path: currentProject.path })
    }

    return result
}
