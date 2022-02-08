"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launch = void 0;
const ArrayToCommand_1 = require("./Utils/ArrayToCommand");
class Launch {
    javaPath;
    parametersManager;
    directoryManager;
    gameVersion;
    authManager;
    /**
     * Main Class for create a Version of Minecraft
     * @param javaPath
     * @param parametersManager
     * @param directoryManager
     * @param gameVersion
     * @param authManager
     */
    constructor(javaPath, parametersManager, directoryManager, gameVersion, authManager) {
        this.javaPath = javaPath;
        this.parametersManager = parametersManager;
        this.directoryManager = directoryManager;
        this.gameVersion = gameVersion;
        this.authManager = authManager;
    }
    // --userProperties {} --uuid nope --userType legacy --tweakClass net.minecraftforge.fml.common.launcher.FMLTweaker
    /**
     *
     * @returns The cmd for the launched (internal)
     */
    getLaunchExternalProfile() {
        var cmd = "";
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.javaPath.getJavaPath());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.parametersManager.getOptionalParameters());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.directoryManager.getNativesParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.parametersManager.getRamParameters());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.directoryManager.getLibsParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.gameVersion.getMainClass());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.authManager.getUsernameParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.authManager.getaccessTokenParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.gameVersion.getVersionParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.directoryManager.getGameDirParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.directoryManager.getAssetsDirParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.gameVersion.getAssetIndexParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.authManager.getUserPropertiesParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.authManager.getUuidParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.authManager.getUserTypeParameter());
        cmd += ArrayToCommand_1.ArrayToCommand.convert(this.gameVersion.getTweakerParameter());
        return cmd;
    }
    getLaunchInternalProfile() {
        var cmd = this.javaPath.getJavaPath();
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
        return cmd;
    }
}
exports.Launch = Launch;
// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
