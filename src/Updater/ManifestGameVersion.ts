import { resolve } from 'path/posix';


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


export class ManifestGameVersion {

    readonly MANIFEST_URL : string = "https://launchermeta.mojang.com/mc/game/version_manifest.json"

    public gameProperties;

    constructor(public gameVersion : string) {}



    /**
     * get
     */
    public async getProperties() {
        let settings = { method: "Get" };

        fetch(this.MANIFEST_URL, settings)
        .then(res => res.json())
            .then((json) => {
                json.versions.forEach(ver => {
                    if(ver.id == this.gameVersion)
                    {
                        fetch(ver.url, settings)
                            .then(res => res.json())
                                .then((json) => {
                                    this.gameProperties = json;
                        });
                    }
            });
        });
        return this.gameProperties;

    }





}