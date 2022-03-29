"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
class AuthManager {
    /**
     * Create User object with parameters
     * @param username - The username of player
     * @param accessToken - accessToken of player ("sry" for crack version)
     * @param uuid - uuid of player ("nope" for crack version)
     */
    constructor(username, accessToken, uuid) {
        this.username = username;
        this.accessToken = accessToken;
        this.uuid = uuid;
    }
    getUsernameParameter() {
        return ["--username", this.username];
    }
    getaccessTokenParameter() {
        return ["--accessToken", this.accessToken];
    }
    getUuidParameter() {
        return ["--uuid", this.uuid];
    }
    getUserTypeParameter() {
        return ["--userType", "legacy"];
    }
    getUserPropertiesParameter() {
        return ["--userProperties", "{}"];
    }
}
exports.AuthManager = AuthManager;
