import path = require("path");
import * as fs from "fs";
import { DirectoryManager } from "..";
import { RecursiveFolderFile } from "../Utils/RecursiveFolderFile";
import { VanillaUpdater } from "./VanillaUpdater";

export class FileDeleter {

    constructor(public dir : DirectoryManager, public excludesFiles : string[] = undefined, public vanillaManifest : ManifestVanillaVersion, public forgeManifest? : ManifestForgeVersion|undefined){}

    public start()
    {
        if( this.vanillaManifest.getAllFiles() == undefined)
        {
            throw new Error("Updater not : Not defined!");
            
        }

        var filesVerif : string[] = this.vanillaManifest.getAllFiles();


        if(this.forgeManifest != undefined)
        {
            filesVerif.concat(this.forgeManifest.getAllFiles());
        }
        const files = RecursiveFolderFile.getAllFiles(this.dir.getGameDirectory(), [], undefined, [this.dir.getNativesDirectory(), path.join(this.dir.getGameDirectory(), "logs")].concat(this.excludesFiles));
        const fileDeleter = files.filter(x => !filesVerif.includes(x));
        fileDeleter.forEach(x => {
            fs.unlinkSync(x);
        });
        return fileDeleter;
    }


}