"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryManager = void 0;
const path = require("path");
const FormatColor_1 = require("./Logger/FormatColor");
const Logger_1 = require("./Logger/Logger");
const ArrayToCommand_1 = require("./Utils/ArrayToCommand");
const RecursiveFolderFile_1 = require("./Utils/RecursiveFolderFile");
class DirectoryManager {
    constructor(gameDir, natives, libs, mainJar, assetsDir) {
        this.gameDir = gameDir;
        this.natives = natives;
        this.libs = libs;
        this.mainJar = mainJar;
        this.assetsDir = assetsDir;
        let msg = "\n";
        msg += "\tGame Directory : " + FormatColor_1.TextColor.GREEN + this.gameDir + "\n" + FormatColor_1.TextFormat.RESET;
        msg += "\tNatives : " + FormatColor_1.TextColor.GREEN + this.natives + "\n" + FormatColor_1.TextFormat.RESET;
        msg += "\tLibraries : " + FormatColor_1.TextColor.GREEN + this.libs + "\n" + FormatColor_1.TextFormat.RESET;
        msg += "\tAssets : " + FormatColor_1.TextColor.GREEN + this.assetsDir + "\n" + FormatColor_1.TextFormat.RESET;
        msg += "\tMainJar : " + FormatColor_1.TextColor.GREEN + this.mainJar + "\n" + FormatColor_1.TextFormat.RESET;
        Logger_1.Logger.getLogger().print("Launcher informations : " + msg);
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
    // public loadLibs;
    // public getLibsParameter() : string[]
    // {   
    //     return ["-cp"].concat(ArrayToCommand.convert(this.loadLibs, ";"));
    // }
    // public setLibs(properties: string[])
    // {
    //     this.loadLibs = properties;
    // }
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
/**
 *
 * @param gameDir The gamedirectory (The other param based of gameDir exemple for natives : gamedir + "/natives" ^^)
 * @param natives natives of the games...
 * @param libs libs,
 * @param mainJar version.jar (or minecraft.jar)
 * @param assetsDir assets
 */
DirectoryManager.DEFAULT_DIRECTORY = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
