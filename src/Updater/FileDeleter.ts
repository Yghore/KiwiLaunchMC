import { DirectoryManager } from "..";
import { RecursiveFolderFile } from "../Utils/RecursiveFolderFile";
import { OfficialManifestGameVersion } from "./OfficialManifestGameVersion";

export class FileDeleter {

    constructor(public dir : DirectoryManager, public manifest : OfficialManifestGameVersion){}

    public start()
    {
        if( this.manifest.gameProperties == undefined)
        {
            throw new Error("Updater not : Not defined!");
            
        }
        return RecursiveFolderFile.getAllFiles(this.dir.getGameDirectory());
       
    }


}