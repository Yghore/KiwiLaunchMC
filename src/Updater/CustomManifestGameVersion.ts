export class CustomManifestGameVersion implements ManifestGameVersion
{

    public gameProperties: any;

    constructor(){}

    checkDownloadFiles(url: string, hash: string, dist: string, rename?: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }




    

}


