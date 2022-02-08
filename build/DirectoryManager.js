"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryManager = void 0;
const path = require("path");
const ArrayToCommand_1 = require("./Utils/ArrayToCommand");
const RecursiveFolderJar_1 = require("./Utils/RecursiveFolderJar");
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
    getGameDirDirectory() {
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
    getAssetDirDirectory() {
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
    getLibsParameter() {
        var arr = ["-cp", ArrayToCommand_1.ArrayToCommand.convert(RecursiveFolderJar_1.RecursiveFolderJar.getAllFiles(this.getLibsDirectory()), ";").concat(this.getmainJar())];
        return arr;
    }
    getNativesParameter() {
        return ["-Djava.library.path=" + this.getNativesDirectory()];
    }
    getGameDirParameter() {
        return ["--gameDir", this.getGameDirDirectory()];
    }
    getAssetsDirParameter() {
        return ["--assetsDir", this.getAssetDirDirectory()];
    }
}
exports.DirectoryManager = DirectoryManager;
// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
