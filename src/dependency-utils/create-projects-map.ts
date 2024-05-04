import fs from 'fs'
import path from 'path'
import {
    AbsolutePath,
    Workspace,
    ProjectsMap,
    AbsoluteProjectPath,
    AbsoluteWorkspacePath,
    ProjectFolderName,
    PackageJSON,
} from '../types.js'

export function createProjectsMap(
    monorepoRootPath: AbsolutePath,
    workspaces: Workspace[]
): ProjectsMap {
    const projectPaths = getProjectsPaths(monorepoRootPath, workspaces)

    return projectPaths.reduce<ProjectsMap>((acc, projectPath) => {
        const packageJSON = getPackageJson(projectPath)

        acc[packageJSON.name] = {
            path: projectPath,
            packageJSON,
        }

        return acc
    }, {})
}

/**
 * @param workspaces - list of workspaces from monorepo config.
 * @returns list of absolute paths to all projects in monorepo.
 **/
function getProjectsPaths(
    monorepoRootPath: AbsolutePath,
    workspaces: Workspace[]
): AbsoluteProjectPath[] {
    return workspaces
        .map((workspace) => path.join(monorepoRootPath, workspace))
        .map(prepareProjectFoldersPaths)
        .flat()
}

function prepareProjectFoldersPaths(
    workspacePath: AbsoluteWorkspacePath
): AbsoluteProjectPath[] {
    return getFolderNames(workspacePath)
        .map((projectFolder) => path.join(workspacePath, projectFolder))
        .filter(isDir)
        .filter(hasPackageJson)
}

function getFolderNames(path: AbsoluteProjectPath): ProjectFolderName[] {
    return fs.readdirSync(path)
}

function isDir(dirPath: AbsoluteProjectPath): boolean {
    return fs.lstatSync(dirPath).isDirectory()
}

function hasPackageJson(dirPath: AbsoluteProjectPath): boolean {
    return fs.existsSync(path.join(dirPath, 'package.json'))
}

/**
 * @returns package.json content
 * @throws Error if package.json cannot be found
 * @throws Error if package.json cannot be parsed
 */
function getPackageJson(projectPath: AbsoluteProjectPath): PackageJSON {
    const packageJsonPath = path.join(projectPath, 'package.json')

    let fileData: string
    try {
        fileData = fs.readFileSync(packageJsonPath, 'utf8')
    } catch (error) {
        throw new Error(`Cannot read ${packageJsonPath}`, {
            cause: error,
        })
    }

    try {
        const packageJson = JSON.parse(fileData)
        return packageJson
    } catch (error) {
        throw new Error(`Cannot parse ${packageJsonPath}`, {
            cause: error,
        })
    }
}
