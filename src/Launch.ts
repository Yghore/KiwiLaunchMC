import path = require('path');
import { DirectoryManager } from './DirectoryManager';
import { JavaPath } from './JavaPath';
import { GameVersion } from './GameVersion';
import { ParametersManager } from './ParametersManager';
import { MinecraftVersion } from './MinecraftVersion';
import { GameTweak } from './GameTweak';
import { AuthManager } from './AuthManager';


export class Launch {
  

    constructor(public javaPath: JavaPath, 
                public parametersManager: ParametersManager, 
                public directoryManager: DirectoryManager, 
                public gameVersion: GameVersion, 
                public authManager: AuthManager) {}

    /**
     * setRam
     */



  // --userProperties {} --uuid nope --userType legacy --tweakClass net.minecraftforge.fml.common.launcher.FMLTweaker

    public launch()
    {
        var cmd : string = this.javaPath.getJavaPath();
        cmd += this.parametersManager.getOptionalParametersLines();
        cmd += this.directoryManager.getNativesParameterLines();
        cmd += this.parametersManager.getRamParametersLines();
        cmd += this.directoryManager.getLibsParameterLines();
        cmd += this.gameVersion.getMainClass();
        cmd += this.authManager.getUsernameParameterLines();
        cmd += this.authManager.getaccessTokenParameterLines();
        cmd += this.gameVersion.getVersionParameterLines();
        cmd += this.directoryManager.getGameDirParameterLines();
        cmd += this.directoryManager.getAssetsDirParameterLines();
        cmd += this.gameVersion.getAssetIndexParameterLines();
        cmd += this.authManager.getUserPropertiesParameterLines();
        cmd += this.authManager.getUuidParameterLines();
        cmd += this.authManager.getUserTypeParameterLines();
        cmd += this.gameVersion.getTweakerParameterLines();
        return cmd;
    }


}

// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
