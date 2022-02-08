import { GameTweak } from "./GameTweak";
import { MinecraftVersion } from "./MinecraftVersion";
export declare class GameVersion {
    version: MinecraftVersion;
    tweak: GameTweak;
    versionIndex: string;
    private tweaker;
    private mainClass;
    /**
     *
     * @param version The version of Minecraft (use Enum MinecraftVersion)
     * @param tweak The GameTweak (System of minecraft, forge, vanilla, etc... use Enum GameTweak)
     * @param versionIndex The version of games (1.12.2, 1.8.8, etc...)
     */
    constructor(version: MinecraftVersion, tweak: GameTweak, versionIndex: string);
    getMainClass(): string[];
    getTweakerParameter(): string[];
    getVersionParameter(): string[];
    getAssetIndexParameter(): string[];
}
