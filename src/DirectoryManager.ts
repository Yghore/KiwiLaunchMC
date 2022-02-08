import path = require('path');
import fs = require('fs');
import { ArrayToCommand } from './Utils/ArrayToCommand';
import { RecursiveFolderJar } from './Utils/RecursiveFolderJar';


export class DirectoryManager {
    /**
     * 
     * @param gameDir The gamedirectory (The other param based of gameDir exemple for natives : gamedir + "/natives" ^^)
     * @param natives natives of the games...
     * @param libs libs,
     * @param mainJar version.jar (or minecraft.jar)
     * @param assetsDir assets 
     */
    constructor(
        public gameDir : string,
        public natives : string,
        public libs : string,
        public mainJar : string,
        public assetsDir : string
        ) {
            this.gameDir = gameDir;
        }


    public getGameDirDirectory() : string  {
        return this.gameDir;
    }

    /**
     * getNativesDirectory
     */
    public getNativesDirectory() : string  {
        return path.join(this.gameDir, this.natives);
    }

    public getmainJar() : string  {
        return path.join(this.gameDir, this.mainJar);
    }

    public getAssetDirDirectory() : string  {
        return path.join(this.gameDir, this.assetsDir);
    }

    public getLibsDirectory() : string  {
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



    public getLibsParameter() : string[]
    {
        var arr : string[] = ["-cp", ArrayToCommand.convert(RecursiveFolderJar.getAllFiles(this.getLibsDirectory()), ";").concat(this.getmainJar())];
        return arr;
    }

    public getNativesParameter() : string[]
    {
        return ["-Djava.library.path=" + this.getNativesDirectory()];
    }


    public getGameDirParameter() : string[]
    {
        return ["--gameDir", this.getGameDirDirectory()];
    }


    public getAssetsDirParameter() : string[]
    {
        return ["--assetsDir", this.getAssetDirDirectory()];
    }



}


// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
