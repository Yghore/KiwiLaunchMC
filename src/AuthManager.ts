export class AuthManager {
    constructor(private username: string, private accessToken: string, private uuid: string) {}

    public getUsernameParameter() : string[]
    {
        return ["--username", this.username];
    }

    public getUsernameParameterLines() : string
    {
        return "--username ".concat(this.username, " ")
    }

    public getaccessTokenParameter() : string[]
    {
        return ["--accessToken", this.accessToken];
    }

    public getaccessTokenParameterLines() : string
    {
        return "--accessToken ".concat(this.accessToken, " ")
    }
    public getUuidParameter() : string[]
    {
        return ["--uuid", this.uuid];
    }

    public getUuidParameterLines() : string
    {
        return "--uuid ".concat(this.uuid, " ")
    }

    public getUserTypeParameter() : string[]
    {
        return ["--userType", "legacy"];
    }

    public getUserTypeParameterLines() : string
    {
        return "--userType legacy ";
    }

    public getUserPropertiesParameter() : string[]
    {
        return ["--userProperties", "{}"];
    }

    public getUserPropertiesParameterLines() : string
    {
        return "--userProperties {} ";
    }

}

