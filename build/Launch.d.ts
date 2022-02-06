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
    constructor(javaPath: JavaPath, parametersManager: ParametersManager, directoryManager: DirectoryManager, gameVersion: GameVersion, authManager: AuthManager);
    /**
     * setRam
     */
    launch(): string;
}
