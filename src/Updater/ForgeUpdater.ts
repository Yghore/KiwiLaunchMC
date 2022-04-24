import { DirectoryManager, GameVersion, Logger } from "..";
import * as fs from "fs";
import * as download from "download";
import * as path from "path";
import * as hasha from "hasha";
import * as StreamZip from "node-stream-zip";
import { LibsInformations } from "../Utils/LibsInformations";
import { ForgeVersion } from "../Version/ForgeVersion";
import { exec, spawn} from "child_process"; 
import { TextColor, TextFormat } from "../Logger/FormatColor";
import { ManifestForgeVersion } from "./Manifests/ManifestForgeVersion";
import { Mod } from "./Manifests/Mod";
import { ProgressBar } from "./ProgressBar";

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


export class ForgeUpdater implements ManifestForgeVersion {


    readonly FORGE_URL = "https://maven.minecraftforge.net/net/minecraftforge/forge/";

    forgeProperties: any;
    gameProperties: any;
    totalDownloadedFiles: any;
    patchedClient: boolean = false;

    allFiles: string[] = [];

    mods : Mod[] = [];



    constructor(public gameVersion : ForgeVersion, public dir : DirectoryManager) {}


    public addMods(mods : Mod[])
    {
        this.mods = this.mods.concat(mods);
    }

    public addMod(mod : Mod)
    {
        this.mods.push(mod);
    }

    public async addModWithUrl(url : string)
    {
        let json = await fetch("https://node1.kiwigdc.fr/test.json", { method: "get" }).then
        (
            (response: Response) => {
                return response.json();
            }
        );

        this.mods = this.mods.concat(json);

    }

    public async setManisfest(): Promise<any> {
        this.gameProperties = [];
        let fileProperties = path.join(this.dir.getGameDirectory(), 'version.json');
        if(!fs.existsSync(fileProperties))
        {
            throw new Error("Updater Error : Version not found !");
            
        }
        this.forgeProperties = require(fileProperties);

    }

    public async isForgeInstalled() : Promise<boolean>
    {
        return fs.existsSync(path.join(this.dir.getLibsDirectory(), "forge-" + this.gameVersion.getMcVer() + "-" + this.gameVersion.getForgeVer() + ".jar"));
    }

    
    public async updateGame() {
        if(await this.isForgeInstalled())
        {
            Logger.getLogger().print("Forge installed, verification...");
            await this.setManisfest();
        }

        await this.downloadsForgeFiles();
        await this.downloadsLibrariesFiles();
        await this.downloadMods();
        //await this.patchClient(); not working, use the forge .jar ?
    }



    public async downloadMods() 
    {
        Logger.getLogger().print("Download mods files : ")
        
        await Promise.all(this.mods.map(async mod => 
            {
                await this.checkDownloadFiles(mod.url, mod.sha1, path.join(this.dir.getGameDirectory(), "mods", path.basename(mod.url)))
            }
        ));
    }




    downloadAssetsFiles(): Promise<void> {
        return;
    }

    public async downloadsForgeFiles()
    {
        
        Logger.getLogger().print("Download forge file");
        var url : string = this.FORGE_URL + this.gameVersion.getMcVer() + "-" + this.gameVersion.getForgeVer() + "/forge-" + this.gameVersion.getMcVer() + "-" + this.gameVersion.getForgeVer() + "-installer.jar";
        var file = path.join(this.dir.getGameDirectory(), "forge-installer.jar");
        await this.checkDownloadFiles(url, "", file);
        Logger.getLogger().print("Forge file :" + TextColor.GREEN + file + TextFormat.RESET + "| Url : " + TextColor.GREEN + url);
        spawn("java", ["-jar", file, "--extract", this.dir.getLibsDirectory()], {cwd: this.dir.gameDir});
        Logger.getLogger().print("Forge extraction");
        this.allFiles.push(path.join(this.dir.getLibsDirectory(), "forge-" + this.gameVersion.getMcVer() + "-" + this.gameVersion.getForgeVer() + ".jar"));
        const zip = new StreamZip.async({ file: file});
        const entries = await zip.entries();
        for await(const entry of Object.values(entries)) 
        {   
            if(entry.isFile && entry.name == "version.json")
            {
                await zip.extract(entry.name, this.dir.getGameDirectory());
                Logger.getLogger().print("Extraction : " + TextColor.GREEN + entry.name);
            }
          

            
        }
        //const count = await zip.extract(null, this.dir.getNativesDirectory());

        await zip.close();


        this.setManisfest();
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
        this.allFiles.push(dist);
        var isChanged : boolean = false;
        if(!fs.existsSync(dist))
        {
            fs.mkdirSync(path.dirname(dist), {recursive: true});
            fs.writeFileSync(dist, await download(url));
            isChanged = true;
            Logger.getLogger().print(TextColor.GREEN + dist);
            this.totalDownloadedFiles++;
            ProgressBar.getProgressBar().add();
            
        }
        else
        {
            if(hash != "" && hasha.fromFileSync(dist, {algorithm: 'sha1'}) != hash){
                fs.writeFileSync(dist, await download(url));
                isChanged = true;
                Logger.getLogger().print(TextColor.GREEN + dist);
                this.totalDownloadedFiles++;
                ProgressBar.getProgressBar().add();
            }

        }
        
        return isChanged;
    }




    getAllFiles() {
        return this.allFiles;
    }

}