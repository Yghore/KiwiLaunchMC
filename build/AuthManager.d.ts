export declare class AuthManager {
    private username;
    private accessToken;
    private uuid;
    constructor(username: string, accessToken: string, uuid: string);
    getUsernameParameter(): string[];
    getaccessTokenParameter(): string[];
    getUuidParameter(): string[];
    getUserTypeParameter(): string[];
    getUserPropertiesParameter(): string[];
}
