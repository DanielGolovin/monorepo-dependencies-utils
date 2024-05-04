export type ProjectFolderName = string

export type AbsolutePath = string

export type AbsoluteProjectPath = string

export type AbsoluteWorkspacePath = string

export type PackageJSONAbsolutePath = string

export type DependencyType =
    | 'dependencies'
    | 'devDependencies'
    | 'peerDependencies'

export type ProjectName = string

export type Workspace = string

export type ProjectBase = { name: ProjectName; path: AbsoluteProjectPath }

export type PackageJSON = {
    [key: string]: unknown
    name: string
} & {
    [key in DependencyType]?: Record<string, string>
}

export type PackageJSONsMap = {
    [packageJSONPath: PackageJSONAbsolutePath]: PackageJSON
}

export type ProjectsMap = {
    [ProjectName: ProjectName]: {
        path: AbsoluteProjectPath
        packageJSON: PackageJSON
    }
}

export type ProjectWithFlatShallowDepNames = {
    name: ProjectName
    path: AbsoluteProjectPath
} & {
    [key in DependencyType]: ProjectName[]
}

export type ShallowDependencyMap = {
    [ProjectName: ProjectName]: ProjectWithFlatShallowDepNames
}

export type ProjectDeepDependencyTreeMap = Record<
    ProjectName,
    ProjectDeepDependencyTree
>

export type ProjectDeepDependencyTree = {
    path: AbsoluteProjectPath
    name: ProjectName
} & {
    [key in DependencyType]: ProjectDeepDependencyTree[]
}

export type ProjectWithDeepDependencies = ProjectBase & {
    [key in DependencyType]: ProjectBase[]
}

export type DeepDependencyMap = Record<ProjectName, ProjectWithDeepDependencies>
