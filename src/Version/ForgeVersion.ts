
export class ForgeVersion
{

    constructor(private mcVer: string, private forgeVer: string){}

    public getMcVer() : string
    {
        return this.mcVer;
    }

    public getForgeVer() : string
    {
        return this.forgeVer;
    }


}