"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryManager = void 0;
const path = require("path");
const ArrayToCommand_1 = require("./Utils/ArrayToCommand");
const RecursiveFolderFile_1 = require("./Utils/RecursiveFolderFile");
class DirectoryManager {
    gameDir;
    natives;
    libs;
    mainJar;
    assetsDir;
    /**
     *
     * @param gameDir The gamedirectory (The other param based of gameDir exemple for natives : gamedir + "/natives" ^^)
     * @param natives natives of the games...
     * @param libs libs,
     * @param mainJar version.jar (or minecraft.jar)
     * @param assetsDir assets
     */
    constructor(gameDir, natives, libs, mainJar, assetsDir) {
        this.gameDir = gameDir;
        this.natives = natives;
        this.libs = libs;
        this.mainJar = mainJar;
        this.assetsDir = assetsDir;
        this.gameDir = gameDir;
    }
    getGameDirectory() {
        return this.gameDir;
    }
    /**
     * getNativesDirectory
     */
    getNativesDirectory() {
        return path.join(this.gameDir, this.natives);
    }
    getmainJar() {
        return path.join(this.gameDir, this.mainJar);
    }
    getAssetDirectory() {
        return path.join(this.gameDir, this.assetsDir);
    }
    getLibsDirectory() {
        return path.join(this.gameDir, this.libs);
    }
    // private getLibsList(libs : string = "") : string {
    //     var dirLibs = this.getLibsDirectory();
    //     try {
    //         fs.readdirSync(dirLibs).forEach(file => {
    //             if(file.substring(file.lastIndexOf('.'), file.length) == ".jar")
    //             {
    //                 libs += path.join(dirLibs ,file) + ";";
    //             }
    //           });
    //     } catch (error) {
    //         throw new Error(`The directory : '${dirLibs}' doesn't exist !`);
    //     }
    //       libs += this.getmainJar() + " ";
    //     return libs;
    // }
    // public getLibsWithJson(dir : string) : string[]
    // {
    //     // libraries->downloads->artifact->path;
    //     var dataout = JSON.parse(fs.readFileSync(dir).toString());
    //     console.log(dataout.libraries.forEach(data => {
    //         console.log(data.downloads.artifact.path);
    //     }));
    //     console.log("FIN");
    //     return [];
    // }
    getLibsParameter() {
        var arr = ["-cp", ArrayToCommand_1.ArrayToCommand.convert(RecursiveFolderFile_1.RecursiveFolderFile.getAllFiles(this.getLibsDirectory(), [], ".jar").filter(file => !file.includes('natives')), ";").concat(this.getmainJar())];
        return arr;
    }
    loadLibs;
    // public getLibsParameter() : string[]
    // {   
    //     return ["-cp"].concat(ArrayToCommand.convert(this.loadLibs, ";"));
    // }
    setLibs(properties) {
        this.loadLibs = properties;
    }
    getNativesParameter() {
        return ["-Djava.library.path=" + this.getNativesDirectory()];
    }
    getGameDirParameter() {
        return ["--gameDir", this.getGameDirectory()];
    }
    getAssetsDirParameter() {
        return ["--assetsDir", this.getAssetDirectory()];
    }
}
exports.DirectoryManager = DirectoryManager;
// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
