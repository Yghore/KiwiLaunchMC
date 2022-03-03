import { DirectoryManager, GameVersion } from "..";
import * as fs from "fs";
import download = require("download");
import path = require("path");
import hasha = require("hasha");
import { LibsInformations } from "../Utils/LibsInformations";
import { ForgeVersion } from "../Version/ForgeVersion";
import { exec, spawn} from "child_process"; 
import StreamZip = require("node-stream-zip");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export class ForgeUpdater implements ManifestForgeVersion {


    readonly FORGE_URL = "https://maven.minecraftforge.net/net/minecraftforge/forge/";

    forgeProperties: any;
    gameProperties: any;
    totalDownloadedFiles: any;

    constructor(public gameVersion : ForgeVersion, public dir : DirectoryManager) {}

    public async setManisfest(): Promise<any> {
        this.gameProperties = [];
        let settings = { method: "get" };
        this.forgeProperties = await fetch(this.FORGE_URL, settings).then(res => res.json())
    }

    public async isForgeInstalled() : Promise<boolean>
    {
        return fs.existsSync(path.join(this.dir.getLibsDirectory(), "forge-" + this.gameVersion.getMcVer() + "-" + this.gameVersion.getForgeVer() + ".jar"));
    }

    
    public async updateGame() {
        if(await this.isForgeInstalled())
        {
            console.log("Forge déjà installé...");
            return;
        }

        await this.downloadsForgeFiles();
        await this.downloadsLibrariesFiles();
    }




    downloadAssetsFiles(): Promise<void> {
        return;
    }

    public async downloadsForgeFiles()
    {
        
        console.log("DOWNLOAD....");
        var url : string = this.FORGE_URL + this.gameVersion.getMcVer() + "-" + this.gameVersion.getForgeVer() + "/forge-" + this.gameVersion.getMcVer() + "-" + this.gameVersion.getForgeVer() + "-installer.jar";
        var file = path.join(this.dir.getGameDirectory(), "forge-installer.jar");
        await this.checkDownloadFiles(url, "", file);
        console.log("FILE : %s | URL : %s", file, url);
        spawn("java", ["-jar", file, "--extract", this.dir.getLibsDirectory()], {cwd: this.dir.gameDir});
        console.log("EXCTRACTION du forge");
        const zip = new StreamZip.async({ file: file});
        const entries = await zip.entries();
        for await(const entry of Object.values(entries)) 
        {   
            if(entry.isFile && entry.name == "version.json")
            {
                await zip.extract(entry.name, this.dir.getGameDirectory());
                console.log("Extraction : " + entry.name);
            }

            
        }
        //const count = await zip.extract(null, this.dir.getNativesDirectory());

        await zip.close();

        this.forgeProperties = require(path.join(this.dir.getGameDirectory(), 'version.json'));

    }

    public async downloadsLibrariesFiles()
    {
        var downloadFilesList : Array<{url: string, name: string, hash: string}> = [];
        await this.forgeProperties.libraries.forEach((val: { name: string; downloads: { artifact: { url: string; sha1: any; }; }; }) => {
            var LibsInfo = new LibsInformations(val.name);            
            if(val.downloads.artifact != undefined) 
            {
                if(val.downloads.artifact.url != "") downloadFilesList.push({url: val.downloads.artifact.url, name: val.name, hash: val.downloads.artifact.sha1});
            }
            
                
        });
        await Promise.all(downloadFilesList.map(async fileInfo => 
            //download(fileInfo.url, this.dir.getLibsDirectory())
            {
                await this.checkDownloadFiles(fileInfo.url, fileInfo.hash, path.join(this.dir.getLibsDirectory(), path.basename(fileInfo.url)))
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
            if(hash != "" && hasha.fromFileSync(dist, {algorithm: 'sha1'}) != hash){
                fs.writeFileSync(dist, await download(url));
                isChanged = true;
                console.log(dist);
                this.totalDownloadedFiles++;
            }

        }
    
        return isChanged;
    }

}