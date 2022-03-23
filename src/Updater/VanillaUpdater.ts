import * as path from "path";
import { DirectoryManager, GameVersion, Logger } from '..';
import * as fs from "fs";
import download = require('download');
import StreamZip = require('node-stream-zip');
import hasha = require('hasha');
import { RecursiveFolderFile } from "../Utils/RecursiveFolderFile";
import crc32 from 'crc/crc32';
import { LibsInformations } from "../Utils/LibsInformations";
import { TextColor } from "../Logger/FormatColor";

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


export class VanillaUpdater implements ManifestVanillaVersion {

    readonly MANIFEST_URL : string = "https://launchermeta.mojang.com/mc/game/version_manifest.json";
    readonly ASSETS_URL : string = "https://resources.download.minecraft.net/";

    public totalDownloadedFiles : number = 0;


    public allFiles : string[] = [];
    public gameProperties;
    public assetIndex;
    public libsLoad : Array<string> = [];



    constructor(public gameVersion : GameVersion, public dir : DirectoryManager) {}

    
    public getGameProperties()
    {
        return this.gameProperties;
    }


    /**
     * get
     */
    public async setManisfest() : Promise<any> {
        let settings = { method: "get" };
        const resJson = await fetch(this.MANIFEST_URL, settings).then(res => res.json())
        this.gameProperties = await Promise.all(resJson.versions
            .filter(version => version.id === this.gameVersion.versionManifest)
            .map(ver => fetch(ver.url, settings).then(res => res.json())));
            
        this.assetIndex = await fetch(this.gameProperties[0].assetIndex.url, settings).then(res => res.json())
    }


    public async updateGame()
    {
        if(!fs.existsSync(this.dir.getGameDirectory())){ fs.mkdirSync(this.dir.getGameDirectory(), {recursive: true})}
        Logger.getLogger().print("Vanilla File : " + TextColor.GREEN + RecursiveFolderFile.getAllFiles(this.dir.getGameDirectory()).length);
        await this.setManisfest();
        await this.downloadsLibrariesFiles();
        await this.downloadAssetsFiles();
        await this.downloadClientJarFiles();
        Logger.getLogger().print("Downloaded : " + TextColor.GREEN + this.totalDownloadedFiles);
    }

    public getMainClass() : string
    {
        return this.gameProperties[0].mainClass;
    }

    public async downloadAssetsFiles()
    {
        var downloadFilesList : Array<{url: string, hash: string}> = [];
        for(var i in this.assetIndex.objects) {
            let val = this.assetIndex.objects[i];
            let hash : string = val.hash;
            let url : string = this.ASSETS_URL + hash.substring(0,2) + "/" + hash;
            downloadFilesList.push({url: (this.ASSETS_URL + hash.substring(0,2) + "/" + hash), hash: val.hash});
         }

        await Promise.all(downloadFilesList.map(async fileInfo => 
        {
            const filePath = fileInfo.url.split('/').pop();
            const passedPath = path.join(this.dir.getAssetDirectory(), 'objects', filePath.substring(0,2), filePath);
            //fs.mkdirSync(passedPath, { recursive: true })
            //fs.writeFileSync(path.join(this.dir.getAssetDirectory(), 'objects', filePath.substring(0,2), filePath), 
            //await download(url))
            //fs.writeFileSync(this.dir.getmainJar(), await download(this.gameProperties[0].downloads.client.url));
            await this.checkDownloadFiles(fileInfo.url, fileInfo.hash, passedPath);
        }));

        //await Promise.all(downloadFilesList.map(url => download(url, path.join(this.dir.getAssetDirDirectory(), 'objects', url.split('/').pop().substring(0,2)))));
        await download(this.gameProperties[0].assetIndex.url, path.join(this.dir.getAssetDirectory(), "indexes"));
    }



    public async downloadsLibrariesFiles()
    {
        var downloadFilesList : Array<{url: string, name: string, hash: string}> = [];

        await Promise.all(this.gameProperties[0].libraries.map(async val => {
            var LibsInfo = new LibsInformations(val.name);            
            if(val['natives'] != undefined)
            {
                if(val['natives']['windows'] != undefined)
                {
                    var nativesUsed : string = val['natives']['windows'];
                    nativesUsed = nativesUsed.replace("${arch}", "64");
                    var filePath = path.join(this.dir.getLibsDirectory(), path.basename(val['downloads']['classifiers'][nativesUsed]['url']));
                    //fs.writeFileSync(filePath, await download(val['downloads']['classifiers']['natives-windows']['url']));
                    var index = downloadFilesList.findIndex(file => new LibsInformations(file.name).getName() == LibsInfo.getName());
                    //if(index == -1 || LibsInfo.compareVersion(new LibsInformations(downloadFilesList[index].name).getVersion())){
                    var downloaded = await this.checkDownloadFiles(val['downloads']['classifiers'][nativesUsed]['url'], val['downloads']['classifiers'][nativesUsed]['sha1'], filePath);
                    if(downloaded) await this.extractNatives(filePath);
                    //}
                }
            }
            if(val.downloads.artifact != undefined) 
            {
                var index = downloadFilesList.findIndex(file => new LibsInformations(file.name).getName() == LibsInfo.getName());
                if(index == -1)
                {
                    downloadFilesList.push({url: val.downloads.artifact.url, name: val.name, hash: val.downloads.artifact.sha1});
                    this.libsLoad.push(path.join(this.dir.getLibsDirectory(), (val.downloads.artifact.url).substring(val.downloads.artifact.url.lastIndexOf("/") + 1)));
                }
                else
                {
                    var index = downloadFilesList.findIndex(file => new LibsInformations(file.name).getName() == LibsInfo.getName());
                    if(LibsInfo.compareVersion(new LibsInformations(downloadFilesList[index].name).getVersion()))
                    {
                        downloadFilesList[index] = {url: val.downloads.artifact.url, name: val.name, hash: val.downloads.artifact.sha1};
                        this.libsLoad.push(path.join(this.dir.getLibsDirectory(), (val.downloads.artifact.url).substring(val.downloads.artifact.url.lastIndexOf("/") + 1)));                    }
                }
            }
    
                
        }));

        await Promise.all(downloadFilesList.map(async fileInfo => 
            //download(fileInfo.url, this.dir.getLibsDirectory())
            {
                await this.checkDownloadFiles(fileInfo.url, fileInfo.hash, path.join(this.dir.getLibsDirectory(), path.basename(fileInfo.url)))
            }
        ));
    }


        
        
    

    public async downloadClientJarFiles()
    {
        //fs.writeFileSync(this.dir.getmainJar(), await download(this.gameProperties[0].downloads.client.url));
        await this.checkDownloadFiles(this.gameProperties[0].downloads.client.url, this.gameProperties[0].downloads.client.sha1, this.dir.getmainJar());
    }




    public async extractNatives(filePath : string)
    {
        const zip = new StreamZip.async({ file: filePath});
        const entries = await zip.entries();
        for (const entry of Object.values(entries)) 
        {   
            if(entry.isDirectory 
                || path.parse(entry.name).ext == '.sha1' 
                || path.parse(entry.name).ext == '.git'
                || path.parse(entry.name).ext == '.class'
                || entry.name.includes('META-INF')) continue;
            
            if(fs.existsSync(path.join(this.dir.getNativesDirectory(), entry.name))
             && crc32(fs.readFileSync(path.join(this.dir.getNativesDirectory(), entry.name))) == entry.crc) continue;

            if(!fs.existsSync(this.dir.getNativesDirectory())){fs.mkdirSync(this.dir.getNativesDirectory(), {recursive: true})}

            await zip.extract(entry.name, this.dir.getNativesDirectory());

            Logger.getLogger().print("Extraction : " + TextColor.GREEN + entry.name);
        }
        //const count = await zip.extract(null, this.dir.getNativesDirectory());

        await zip.close();
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
            
        }
        else
        {
            if(hasha.fromFileSync(dist, {algorithm: 'sha1'}) != hash){
                fs.writeFileSync(dist, await download(url));
                isChanged = true;
                Logger.getLogger().print(TextColor.GREEN + dist);
                this.totalDownloadedFiles++;
            }

        }
    
        return isChanged;
    }

    public getAllFiles() : string[]
    {
        return this.allFiles;
    }

}



