import * as path from "path";
import { DirectoryManager, GameVersion } from '..';
import * as fs from "fs";
import download = require('download');
import StreamZip = require('node-stream-zip');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


export class ManifestGameVersion {

    readonly MANIFEST_URL : string = "https://launchermeta.mojang.com/mc/game/version_manifest.json";
    readonly ASSETS_URL : string = "https://resources.download.minecraft.net/";

    public gameProperties;
    public assetIndex;

    constructor(public gameVersion : GameVersion, private dir : DirectoryManager) {}

    

    /**
     * get
     */
    public async setManisfest() : Promise<any> {
        let settings = { method: "get" };
        const resJson = await fetch(this.MANIFEST_URL, settings).then(res => res.json())
        this.gameProperties = await Promise.all(resJson.versions
            .filter(version => version.id === this.gameVersion.versionManisfest)
            .map(ver => fetch(ver.url, settings).then(res => res.json())));
            
        this.assetIndex = await fetch(this.gameProperties[0].assetIndex.url, settings).then(res => res.json())
    }


    public async updateGame()
    {
        if(!fs.existsSync(this.dir.getGameDirectory())){ fs.mkdirSync(this.dir.getGameDirectory(), {recursive: true})}
        await this.setManisfest();
        await this.downloadsLibrariesFiles();
        await this.downloadAssetsFiles();
        await this.downloadNativesFiles();
        await this.downloadClientJarFiles();
    }

    public getMainClass() : string
    {
        return this.gameProperties[0].mainClass;
    }

    public async downloadAssetsFiles()
    {
        var downloadFilesList : Array<string> = [];
        for(var i in this.assetIndex.objects) {
            let val = this.assetIndex.objects[i];
            let hash : string = val.hash;
            let url : string = this.ASSETS_URL + hash.substring(0,2) + "/" + hash;
            downloadFilesList.push(this.ASSETS_URL + hash.substring(0,2) + "/" + hash);
         }

        await Promise.all(downloadFilesList.map(async url => 
        {
            const filePath = url.split('/').pop();
            const passedPath = path.join(this.dir.getAssetDirectory(), 'objects', filePath.substring(0,2));
            fs.mkdirSync(passedPath, { recursive: true })
            fs.writeFileSync(path.join(this.dir.getAssetDirectory(), 'objects', filePath.substring(0,2), filePath), 
            await download(url))
        }));

        //await Promise.all(downloadFilesList.map(url => download(url, path.join(this.dir.getAssetDirDirectory(), 'objects', url.split('/').pop().substring(0,2)))));
        await download(this.gameProperties[0].assetIndex.url, path.join(this.dir.getAssetDirectory(), "indexes"));
    }

    public async downloadsLibrariesFiles()
    {
        var downloadFilesList : Array<string> = [];
        
        this.gameProperties[0].libraries.forEach(val => {
            if(val.downloads.artifact != undefined) downloadFilesList.push(val.downloads.artifact.url);

                
        });
        await Promise.all(downloadFilesList.map(url => download(url, this.dir.getLibsDirectory())));
    }


    public async downloadNativesFiles()
    {

        var downloadFilesList : Array<string> = [];
        var i = 0;
        this.gameProperties[0].libraries.forEach(async val => {
            if(val['downloads']['classifiers'] != undefined)
            {
                if(val['downloads']['classifiers']['natives-windows'] != undefined)
                {
                    let pathTemp = path.join(this.dir.getNativesDirectory(), "temp");
                    if(!fs.existsSync(pathTemp))
                    {
                        fs.mkdirSync(pathTemp, { recursive: true });
                    }
                    let filePath = path.join(pathTemp, "natives_" + i.toString() + ".temp.jar");
                    i++;
                    fs.writeFileSync(filePath, await download(val['downloads']['classifiers']['natives-windows']['url']));
                    const zip = new StreamZip.async({ file: filePath});
                    
                    const count = await zip.extract(null, this.dir.getNativesDirectory());
                    console.log(`Extracted ${count} entries`);
                    await zip.close();
                    fs.unlinkSync(filePath);
                    
                }          
            }
        });
        //fs.unlinkSync(path.join(this.dir.getNativesDirectory(), "temp"));
        //if(fs.existsSync(path.join(this.dir.getNativesDirectory(), "META-INF"))) { fs.unlinkSync(path.join(this.dir.getNativesDirectory(), "META-INF")); }


        
        
    }

    public async downloadClientJarFiles()
    {
        fs.writeFileSync(this.dir.getmainJar(), await download(this.gameProperties[0].downloads.client.url));
    }

}



