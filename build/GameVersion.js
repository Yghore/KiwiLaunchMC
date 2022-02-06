"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameVersion = void 0;
const GameTweak_1 = require("./GameTweak");
const MinecraftVersion_1 = require("./MinecraftVersion");
class GameVersion {
    version;
    tweak;
    versionIndex;
    tweaker;
    mainClass = "net.minecraft.launchwrapper.Launch ";
    constructor(version, tweak, versionIndex) {
        this.version = version;
        this.tweak = tweak;
        this.versionIndex = versionIndex;
        if (tweak == GameTweak_1.GameTweak.FORGE) {
            if (version == MinecraftVersion_1.MinecraftVersion.V1_7_10) {
                this.tweaker = "cpw.mods.fml.common.launcher.FMLTweaker";
            }
            else if (version == MinecraftVersion_1.MinecraftVersion.V1_8_HIGHER) {
                this.tweaker = "net.minecraftforge.fml.common.launcher.FMLTweaker";
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
        return ["--tweakClass", this.tweaker];
    }
    getVersionParameter() {
        return ["--version", this.versionIndex];
    }
    getAssetIndexParameter() {
        return ["--assetIndex", this.versionIndex];
    }
}
exports.GameVersion = GameVersion;
