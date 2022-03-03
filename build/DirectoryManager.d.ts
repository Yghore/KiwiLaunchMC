export declare class DirectoryManager {
    gameDir: string;
    natives: string;
    libs: string;
    mainJar: string;
    assetsDir: string;
    /**
     *
     * @param gameDir The gamedirectory (The other param based of gameDir exemple for natives : gamedir + "/natives" ^^)
     * @param natives natives of the games...
     * @param libs libs,
     * @param mainJar version.jar (or minecraft.jar)
     * @param assetsDir assets
     */
    constructor(gameDir: string, natives: string, libs: string, mainJar: string, assetsDir: string);
    getGameDirectory(): string;
    /**
     * getNativesDirectory
     */
    getNativesDirectory(): string;
    getmainJar(): string;
    getAssetDirectory(): string;
    getLibsDirectory(): string;
    getLibsParameter(): string[];
    loadLibs: any;
    setLibs(properties: string[]): void;
    getNativesParameter(): string[];
    getGameDirParameter(): string[];
    getAssetsDirParameter(): string[];
}
