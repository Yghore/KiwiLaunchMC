"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthManager_1 = require("./AuthManager");
const DirectoryManager_1 = require("./DirectoryManager");
const GameTweak_1 = require("./GameTweak");
const GameVersion_1 = require("./GameVersion");
const JavaPath_1 = require("./JavaPath");
const Launch_1 = require("./Launch");
const MinecraftVersion_1 = require("./MinecraftVersion");
const ParametersManager_1 = require("./ParametersManager");
const ProcessManager_1 = require("./ProcessManager");
const ProcessProfile_1 = require("./ProcessProfile");
var parameters = new ParametersManager_1.ParametersManager(1024, 2048, "M");
var dir = new DirectoryManager_1.DirectoryManager("C:/Users/yhgor/AppData/Roaming/.AllDeadReturnV2", "natives", "libs", "minecraft.jar", "assets");
var java = new JavaPath_1.JavaPath("java"); // Use java or directory (bin/java is add into class)
var ver = new GameVersion_1.GameVersion(MinecraftVersion_1.MinecraftVersion.V1_8_HIGHER, GameTweak_1.GameTweak.VANILLA, "1.12.2");
var auth = new AuthManager_1.AuthManager("Player2042", "sry", "nope");
var globalLaunch = new Launch_1.Launch(java, parameters, dir, ver, auth);
var process = new ProcessManager_1.ProcessManager(globalLaunch, ProcessProfile_1.ProcessProfile.INTERNAL);
let launch = process.Launch();
console.log(globalLaunch.getLaunchExternalProfile());
console.log("Lancement du jeu !");
launch.stdout.on('data', function (data) {
    console.log(data.toString());
});
launch.stderr.on('data', function (data) {
    console.log('ERROR :' + data.toString());
});
