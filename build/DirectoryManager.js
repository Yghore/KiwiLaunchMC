"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryManager = void 0;
const path = require("path");
const fs = require("fs");
class DirectoryManager {
    gameDir;
    natives;
    libs;
    mainJar;
    assetsDir;
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
    getLibsList() {
        var dirLibs = this.getLibsDirectory();
        var libs = "";
        try {
            fs.readdirSync(dirLibs).forEach(file => {
                if (file.substring(file.lastIndexOf('.'), file.length) == ".jar") {
                    libs += path.join(dirLibs, file) + ";";
                }
            });
        }
        catch (error) {
            throw new Error(`The directory : '${dirLibs}' doesn't exist !`);
        }
        libs += this.getmainJar() + " ";
        return libs;
    }
    getLibsParameter() {
        var arr = ["-cp", this.getLibsList()];
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
