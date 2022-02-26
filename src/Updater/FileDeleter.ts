import { DirectoryManager } from "..";
import { RecursiveFolderFile } from "../Utils/RecursiveFolderFile";
import { VanillaUpdater } from "./VanillaUpdater";

export class FileDeleter {

    constructor(public dir : DirectoryManager, public manifest : VanillaUpdater){}

    public start()
    {
        if( this.manifest.gameProperties == undefined)
        {
            throw new Error("Updater not : Not defined!");
            
        }
        return RecursiveFolderFile.getAllFiles(this.dir.getGameDirectory());
       
    }


}