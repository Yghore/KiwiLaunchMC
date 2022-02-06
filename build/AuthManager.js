"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
class AuthManager {
    username;
    accessToken;
    uuid;
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
