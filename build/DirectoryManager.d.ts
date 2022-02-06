export declare class DirectoryManager {
    gameDir: string;
    natives: string;
    libs: string;
    mainJar: string;
    assetsDir: string;
    constructor(gameDir: string, natives: string, libs: string, mainJar: string, assetsDir: string);
    getGameDirDirectory(): string;
    /**
     * getNativesDirectory
     */
    getNativesDirectory(): string;
    getmainJar(): string;
    getAssetDirDirectory(): string;
    getLibsDirectory(): string;
    private getLibsList;
    getLibsParameter(): string[];
    getNativesParameter(): string[];
    getGameDirParameter(): string[];
    getAssetsDirParameter(): string[];
}
