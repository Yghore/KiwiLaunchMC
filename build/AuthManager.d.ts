export declare class AuthManager {
    private username;
    private accessToken;
    private uuid;
    /**
     * Create User object with parameters
     * @param username - The username of player
     * @param accessToken - accessToken of player ("sry" for crack version)
     * @param uuid - uuid of player ("nope" for crack version)
     */
    constructor(username: string, accessToken: string, uuid: string);
    getUsernameParameter(): string[];
    getaccessTokenParameter(): string[];
    getUuidParameter(): string[];
    getUserTypeParameter(): string[];
    getUserPropertiesParameter(): string[];
}
