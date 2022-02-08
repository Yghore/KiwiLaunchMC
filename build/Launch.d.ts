import { DirectoryManager } from './DirectoryManager';
import { JavaPath } from './JavaPath';
import { GameVersion } from './GameVersion';
import { ParametersManager } from './ParametersManager';
import { AuthManager } from './AuthManager';
export declare class Launch {
    javaPath: JavaPath;
    parametersManager: ParametersManager;
    directoryManager: DirectoryManager;
    gameVersion: GameVersion;
    authManager: AuthManager;
    /**
     * Main Class for create a Version of Minecraft
     * @param javaPath
     * @param parametersManager
     * @param directoryManager
     * @param gameVersion
     * @param authManager
     */
    constructor(javaPath: JavaPath, parametersManager: ParametersManager, directoryManager: DirectoryManager, gameVersion: GameVersion, authManager: AuthManager);
    /**
     *
     * @returns The cmd for the launched (internal)
     */
    getLaunchExternalProfile(): string;
    getLaunchInternalProfile(): string[];
}
