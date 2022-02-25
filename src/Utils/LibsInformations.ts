

export class LibsInformations
{

    public informations: {dir: string, name: string, version: string};
    
    constructor(info: string) 
    {
        var splitted = info.split(':');
        this.informations = {dir: splitted[0], name: splitted[1], version: splitted[2]};

    }

    public getDir() : string
    {
        return this.informations.dir;
    }

    public getName() : string
    {
        return this.informations.name;
    }

    public getVersion() : string
    {
        return this.informations.version;
    }

    public compareVersion(ver: string) : boolean
    {
        if(this.informations.version == ver)
        {
            return false;
        }
        else
        {
            var verLocal = LibsInformations.versionSplit(this.informations.version);
            var verDist = LibsInformations.versionSplit(ver);
            for (let i = verLocal.length - 1; i > 0; i--) {
                
                const local = verLocal[i];
                const dist = verDist[i] != undefined ? verDist[i] : 0;
                if(dist < local)
                {
                    return true;
                }

                
            }
            return false;
        }
    }

    public static versionSplit(ver: string) : Array<number>
    {
        var split : Array<number> = ver.split('.').map(Number);
        return split;
    }


}
