import { ManifestVanillaVersion } from "./Manifests/ManifestVanillaVersion";

export class CustomUpdater implements ManifestVanillaVersion
{
    gameVersion: any;
    getAllFiles() {
        throw new Error("Method not implemented.");
    }
    allFiles: string[];
    gameProperties: any;
    dir: any;
    checkDownloadFiles(url: string, hash: string, dist: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    extractNatives(filePath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setManisfest(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateGame(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    downloadAssetsFiles(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    downloadsLibrariesFiles(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    downloadClientJarFiles(): Promise<void> {
        throw new Error("Method not implemented.");
    }





    

}


