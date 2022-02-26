import { DirectoryManager, GameVersion } from "..";
import * as fs from "fs";
import download = require("download");
import path = require("path");
import hasha = require("hasha");
import { LibsInformations } from "../Utils/LibsInformations";

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export class ForgeUpdater implements ManifestForgeVersion {


    readonly FORGE_URL = "https://api.alldeadreturn.fr/forge-1.12.2.json";

    forgeProperties: any;
    gameProperties: any;
    totalDownloadedFiles: any;

    constructor(public gameVersion : ForgeVersion, public dir : DirectoryManager) {}

    public async setManisfest(): Promise<any> {
        this.gameProperties = [];
        let settings = { method: "get" };
        this.forgeProperties = await fetch(this.FORGE_URL, settings).then(res => res.json())
    }

    
    public async updateGame(): Promise<void> {
        await this.downloadsLibrariesFiles();
    }




    downloadAssetsFiles(): Promise<void> {
        return;
    }

    public async downloadsForgeFiles()
    {
        this.checkDownloadFiles(fileInfo.url, fileInfo.hash, path.join(this.dir.getLibsDirectory(), path.basename(fileInfo.url)))
    }

    public async downloadsLibrariesFiles()
    {
        var downloadFilesList : Array<{url: string, name: string, hash: string}> = [];
        
        await this.forgeProperties.libraries.forEach(async val => {
            var LibsInfo = new LibsInformations(val.name);            
            if(val.downloads.artifact != undefined) 
            {
                if(val.downloads.artifact.url != "") downloadFilesList.push({url: val.downloads.artifact.url, name: val.name, hash: val.downloads.artifact.sha1});
            }
            
                
        });
        await Promise.all(downloadFilesList.map(fileInfo => 
            //download(fileInfo.url, this.dir.getLibsDirectory())
            {
            this.checkDownloadFiles(fileInfo.url, fileInfo.hash, path.join(this.dir.getLibsDirectory(), path.basename(fileInfo.url)))
            }
            ));
    }


    extractNatives(filePath: string): Promise<void> {
        return;
    }

    downloadClientJarFiles(): Promise<void> {
        return;
    }

    public async checkDownloadFiles(url : string, hash : string, dist: string) : Promise<boolean>
    {
        var isChanged : boolean = false;
        if(!fs.existsSync(dist))
        {
            fs.mkdirSync(path.dirname(dist), {recursive: true});
            fs.writeFileSync(dist, await download(url));
            isChanged = true;
            console.log(dist);
            this.totalDownloadedFiles++;
            
        }
        else
        {
            if(hasha.fromFileSync(dist, {algorithm: 'sha1'}) != hash){
                fs.writeFileSync(dist, await download(url));
                isChanged = true;
                console.log(dist);
                this.totalDownloadedFiles++;
            }

        }
    
        return isChanged;
    }

}