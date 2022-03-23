import { DirectoryManager } from './DirectoryManager';
import { JavaPath } from './JavaPath';
import { GameVersion } from './Version/GameVersion';
import { ParametersManager } from './ParametersManager';
import { AuthManager } from './AuthManager';
import { ArrayToCommand } from './Utils/ArrayToCommand';
import { Logger } from './Logger/Logger';


export class Launch {
  


    /**
     * Main Class for create a Version of Minecraft
     * @param javaPath 
     * @param parametersManager 
     * @param directoryManager 
     * @param gameVersion 
     * @param authManager 
     */
    constructor(public javaPath: JavaPath, 
                public parametersManager: ParametersManager, 
                public directoryManager: DirectoryManager, 
                public gameVersion: GameVersion, 
                public authManager: AuthManager) {}





  // --userProperties {} --uuid nope --userType legacy --tweakClass net.minecraftforge.fml.common.launcher.FMLTweaker
    /**
     * 
     * @returns The cmd for the launched (internal)
     */
    public getLaunchExternalProfile() : string
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
        cmd += ArrayToCommand.convert(this.parametersManager.getExtraParameters());
        return cmd;
    }

    public getLaunchInternalProfile() : string[]
    {
        var cmd : string[] = this.javaPath.getJavaPath();
        cmd = cmd.concat(this.parametersManager.getOptionalParameters());
        cmd = cmd.concat(this.directoryManager.getNativesParameter());
        cmd = cmd.concat(this.parametersManager.getRamParameters());
        cmd = cmd.concat(this.directoryManager.getLibsParameter());
        cmd = cmd.concat(this.gameVersion.getMainClass());
        cmd = cmd.concat(this.authManager.getUsernameParameter());
        cmd = cmd.concat(this.authManager.getaccessTokenParameter());
        cmd = cmd.concat(this.gameVersion.getVersionParameter());
        cmd = cmd.concat(this.directoryManager.getGameDirParameter());
        cmd = cmd.concat(this.directoryManager.getAssetsDirParameter());
        cmd = cmd.concat(this.gameVersion.getAssetIndexParameter());
        cmd = cmd.concat(this.authManager.getUserPropertiesParameter());
        cmd = cmd.concat(this.authManager.getUuidParameter());
        cmd = cmd.concat(this.authManager.getUserTypeParameter());
        cmd = cmd.concat(this.gameVersion.getTweakerParameter());
        cmd = cmd.concat(this.parametersManager.getExtraParameters());
        return cmd;
    }


}

// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
