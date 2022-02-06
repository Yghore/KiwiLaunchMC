import { GameTweak } from "./GameTweak";
import { MinecraftVersion } from "./MinecraftVersion";
export declare class GameVersion {
    version: MinecraftVersion;
    tweak: GameTweak;
    versionIndex: string;
    private tweaker;
    private mainClass;
    constructor(version: MinecraftVersion, tweak: GameTweak, versionIndex: string);
    getMainClass(): string[];
    getTweakerParameter(): string[];
    getVersionParameter(): string[];
    getAssetIndexParameter(): string[];
}
