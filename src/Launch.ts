import path = require('path');
import { DirectoryManager } from './DirectoryManager';
import { JavaPath } from './JavaPath';
import { GameVersion } from './GameVersion';
import { ParametersManager } from './ParametersManager';
import { MinecraftVersion } from './MinecraftVersion';
import { GameTweak } from './GameTweak';
import { AuthManager } from './AuthManager';
import { ArrayToCommand } from './Utils/ArrayToCommand';


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
        var cmd : string = "";
        cmd += ArrayToCommand.convert(this.javaPath.getJavaPath());
        cmd += ArrayToCommand.convert(this.parametersManager.getOptionalParameters());
        cmd += ArrayToCommand.convert(this.directoryManager.getNativesParameter());
        cmd += ArrayToCommand.convert(this.parametersManager.getRamParameters());
        cmd += ArrayToCommand.convert(this.directoryManager.getLibsParameter());
        cmd += ArrayToCommand.convert(this.gameVersion.getMainClass());
        cmd += ArrayToCommand.convert(this.authManager.getUsernameParameter());
        cmd += ArrayToCommand.convert(this.authManager.getaccessTokenParameter());
        cmd += ArrayToCommand.convert(this.gameVersion.getVersionParameter());
        cmd += ArrayToCommand.convert(this.directoryManager.getGameDirParameter());
        cmd += ArrayToCommand.convert(this.directoryManager.getAssetsDirParameter());
        cmd += ArrayToCommand.convert(this.gameVersion.getAssetIndexParameter());
        cmd += ArrayToCommand.convert(this.authManager.getUserPropertiesParameter());
        cmd += ArrayToCommand.convert(this.authManager.getUuidParameter());
        cmd += ArrayToCommand.convert(this.authManager.getUserTypeParameter());
        cmd += ArrayToCommand.convert(this.gameVersion.getTweakerParameter());
        return cmd;
    }


}

// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
