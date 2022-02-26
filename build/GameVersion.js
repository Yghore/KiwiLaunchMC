"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameVersion = void 0;
const GameTweak_1 = require("./GameTweak");
const MinecraftVersion_1 = require("./MinecraftVersion");
class GameVersion {
    version;
    tweak;
    versionIndex;
    versionManisfest;
    mainClass = "net.minecraft.client.main.Main";
    tweaker;
    // 1.13.2 ou plus haut avec forge : 'cpw.mods.modlauncher.Launcher'
    // 1.8 ou plus haut : 'net.minecraft.client.main.Main'
    // 1.7.2 ou plus bas : 'net.minecraft.client.main.Main'
    // 1.5.2 ou plus bas : 'net.minecraft.launchwrapper.Launch'
    /**
     *
     * @param version The version of Minecraft (use Enum MinecraftVersion)
     * @param tweak The GameTweak (System of minecraft, forge, vanilla, etc... use Enum GameTweak)
     * @param versionIndex The version of games (1.12.2, 1.8.8, etc...)
     */
    constructor(version, tweak, versionIndex, versionManisfest) {
        this.version = version;
        this.tweak = tweak;
        this.versionIndex = versionIndex;
        this.versionManisfest = versionManisfest;
        if (tweak == GameTweak_1.GameTweak.FORGE) {
            if (version == MinecraftVersion_1.MinecraftVersion.V1_13_2_HIGHER) {
                this.mainClass = 'cpw.mods.modlauncher.Launcher';
            }
            if (version == MinecraftVersion_1.MinecraftVersion.V1_7_10) {
                this.tweaker = "cpw.mods.fml.common.launcher.FMLTweaker";
            }
            else if (version == MinecraftVersion_1.MinecraftVersion.V1_8_HIGHER) {
                this.tweaker = "net.minecraftforge.fml.common.launcher.FMLTweaker";
                this.mainClass = "net.minecraft.launchwrapper.Launch";
            }
        }
        else {
            this.tweak = null;
        }
    }
    getMainClass() {
        return [this.mainClass];
    }
    getTweakerParameter() {
        if (this.tweaker != undefined) {
            return ["--tweakClass", this.tweaker];
        }
        return [];
    }
    getVersionParameter() {
        return ["--version", this.versionManisfest];
    }
    getAssetIndexParameter() {
        return ["--assetIndex", this.versionIndex];
    }
}
exports.GameVersion = GameVersion;
