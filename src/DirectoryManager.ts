import * as path from "path";
import { Logger } from "./Logger/Logger";
import { ArrayToCommand } from './Utils/ArrayToCommand';
import { RecursiveFolderFile } from './Utils/RecursiveFolderFile';


export class DirectoryManager {
    /**
     * 
     * @param gameDir The gamedirectory (The other param based of gameDir exemple for natives : gamedir + "/natives" ^^)
     * @param natives natives of the games...
     * @param libs libs,
     * @param mainJar version.jar (or minecraft.jar)
     * @param assetsDir assets 
     */

    public kLogger? : undefined|Logger;

    constructor(
        public gameDir : string,
        public natives : string,
        public libs : string,
        public mainJar : string,
        public assetsDir : string,
        ) {
            this.gameDir = gameDir;
        }


    public getGameDirectory() : string  {
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

    public getAssetDirectory() : string  {
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

    public getLibsParameter() : string[]
    {
        var arr : string[] = ["-cp", ArrayToCommand.convert(RecursiveFolderFile.getAllFiles(this.getLibsDirectory(), [], ".jar").filter(file => !file.includes('natives')), ";").concat(this.getmainJar())];
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

    public getNativesParameter() : string[]
    {
        return ["-Djava.library.path=" + this.getNativesDirectory()];
    }


    public getGameDirParameter() : string[]
    {
        return ["--gameDir", this.getGameDirectory()];
    }


    public getAssetsDirParameter() : string[]
    {
        return ["--assetsDir", this.getAssetDirectory()];
    }



}


// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
