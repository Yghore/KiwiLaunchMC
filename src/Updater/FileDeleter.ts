import path = require("path");
import * as fs from "fs";
import { DirectoryManager, Logger, TextColor, TextFormat } from "..";
import { RecursiveFolderFile } from "../Utils/RecursiveFolderFile";

export class FileDeleter {



    constructor(public dir : DirectoryManager, public excludesFiles : string[] = undefined, public vanillaManifest : ManifestVanillaVersion, public forgeManifest? : ManifestForgeVersion|undefined){}

    public start()
    {
        if( this.vanillaManifest.getAllFiles() == undefined)
        {
            throw new Error("Updater not : Not defined!");
            
        }

        var filesVerif : string[] = this.vanillaManifest.getAllFiles();
        // KEEP LOGS AND USER EXCLUDES FILES
        var excludesFilesDefault : string[] = [this.dir.getNativesDirectory(), path.join(this.dir.getGameDirectory(), "logs")].concat(this.excludesFiles);
        // KEEP INDEXES ALL INDEXES ^^
        excludesFilesDefault = excludesFilesDefault.concat(RecursiveFolderFile.getAllFiles(path.join(this.dir.getGameDirectory(), "assets", "indexes")));
        if(this.forgeManifest != undefined)
        {
            filesVerif = filesVerif.concat(this.forgeManifest.getAllFiles());
            excludesFilesDefault.push(path.join(this.dir.getGameDirectory(),"version.json"));
            
        }
        
        const files = RecursiveFolderFile.getAllFiles(this.dir.getGameDirectory(), [], undefined, excludesFilesDefault);
        const fileDeleter = files.filter(x => !filesVerif.includes(x));
        fileDeleter.forEach(x => { 
            fs.unlinkSync(x);
        });
        Logger.getLogger().print("File deleter : " + TextColor.RED + fileDeleter.length + TextFormat.RESET);
        
        return fileDeleter;
    }


}