import path = require('path');
import fs = require('fs');


export class DirectoryManager {
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

    private getLibsList() : string {
        var dirLibs = this.getLibsDirectory();
        var libs : string = "";
        fs.readdirSync(dirLibs).forEach(file => {
            if(file.substring(file.lastIndexOf('.'), file.length) == ".jar")
            {
                libs += path.join(dirLibs ,file) + ";";
            }
            
          });
    
          libs += this.getmainJar() + " ";
        
        return libs;
    }

    public getLibsParameterLines() : string 
    {
        
        return "-cp " + this.getLibsList();
    }

    public getLibsParameter() : string[]
    {
        var arr : string[];
        arr.push("-cp");
        arr.concat(this.getLibsList());
        return arr;
    }

    public getNativesParameter() : string[]
    {
        return ["-Djava.library.path=" + this.getNativesDirectory()];
    }

    public getNativesParameterLines() : string
    {
        return "-Djava.library.path=" + this.getNativesDirectory() + " ";
    }

    public getGameDirParameter() : string[]
    {
        return ["--gameDir", this.getGameDirDirectory()];
    }

    public getGameDirParameterLines() : string
    {
        return "--gameDir".concat(" ", this.getGameDirDirectory(), " ");
    }

    public getAssetsDirParameter() : string[]
    {
        return ["--assetsDir", this.getAssetDirDirectory()];
    }

    public getAssetsDirParameterLines() : string
    {
        return "--assetsDir".concat(" ", this.getAssetDirDirectory(), " ");
    }


}


// natives
// libs
// minecraft.jar
// gameDir
// assetsDir
