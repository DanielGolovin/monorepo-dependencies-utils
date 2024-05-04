import {
    ProjectsMap,
    ShallowDependencyMap,
    DependencyType,
    ProjectName,
} from '../types.js'

export function createShallowDependencyMap(
    projectsMap: ProjectsMap
): ShallowDependencyMap {
    const dependencyTypes = [
        'dependencies',
        'devDependencies',
        'peerDependencies',
    ] as const

    return Object.entries(projectsMap).reduce<ShallowDependencyMap>(
        (map, [projectName, { path, packageJSON }]) => {
            const workspaceDeps: Record<DependencyType, ProjectName[]> = {
                dependencies: [],
                devDependencies: [],
                peerDependencies: [],
            }

            dependencyTypes.forEach((type) =>
                Object.keys(packageJSON[type] || {}).forEach(
                    (dep) =>
                        Object.hasOwn(projectsMap, dep) &&
                        workspaceDeps[type].push(dep)
                )
            )

            map[projectName] = {
                name: projectName,
                path: path,
                ...workspaceDeps,
            }

            return map
        },
        {}
    )
}
