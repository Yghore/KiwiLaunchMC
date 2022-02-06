export class AuthManager {
    constructor(private username: string, private accessToken: string, private uuid: string) {}

    public getUsernameParameter() : string[]
    {
        return ["--username", this.username];
    }

    public getaccessTokenParameter() : string[]
    {
        return ["--accessToken", this.accessToken];
    }


    public getUuidParameter() : string[]
    {
        return ["--uuid", this.uuid];
    }



    public getUserTypeParameter() : string[]
    {
        return ["--userType", "legacy"];
    }



    public getUserPropertiesParameter() : string[]
    {
        return ["--userProperties", "{}"];
    }



}

