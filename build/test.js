"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthManager_1 = require("./AuthManager");
const DirectoryManager_1 = require("./DirectoryManager");
const GameTweak_1 = require("./GameTweak");
const GameVersion_1 = require("./Version/GameVersion");
const JavaPath_1 = require("./JavaPath");
const Launch_1 = require("./Launch");
const MinecraftVersion_1 = require("./Version/MinecraftVersion");
const ParametersManager_1 = require("./ParametersManager");
const ProcessManager_1 = require("./ProcessManager");
const ProcessProfile_1 = require("./ProcessProfile");
const FileDeleter_1 = require("./Updater/FileDeleter");
const VanillaUpdater_1 = require("./Updater/VanillaUpdater");
const ForgeUpdater_1 = require("./Updater/ForgeUpdater");
const ForgeVersion_1 = require("./Version/ForgeVersion");
const KLogger_1 = require("./Logger/KLogger");
const path = require("path");
const FormatColor_1 = require("./Logger/FormatColor");
(async function () {
    var kLogger = new KLogger_1.KLogger(path.join(__dirname, "launcher_logs.log"), "[LauncherTest]");
    var dir = new DirectoryManager_1.DirectoryManager("C:/Users/yhgor/AppData/Roaming/.LauncherTest", "natives", "libraries", "minecraft.jar", "assets");
    var ver = new GameVersion_1.GameVersion(MinecraftVersion_1.MinecraftVersion.V1_8_HIGHER, GameTweak_1.GameTweak.VANILLA, "1.12", "1.12.2");
    var vanillaUpdater = new VanillaUpdater_1.VanillaUpdater(ver, dir);
    var forgeUpdater = new ForgeUpdater_1.ForgeUpdater(new ForgeVersion_1.ForgeVersion(ver.versionManifest, "14.23.5.2860"), dir);
    var deleter = new FileDeleter_1.FileDeleter(dir, [], vanillaUpdater, forgeUpdater);
    var parameters = new ParametersManager_1.ParametersManager(1024, 1024, "M");
    var java = new JavaPath_1.JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new AuthManager_1.AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new Launch_1.Launch(java, parameters, dir, ver, auth);
    var process = new ProcessManager_1.ProcessManager(globalLaunch, ProcessProfile_1.ProcessProfile.INTERNAL);
    await vanillaUpdater.setManisfest();
    await vanillaUpdater.updateGame();
    //await forgeUpdater.updateGame();
    //dir.setLibs(vanillaUpdater.libsLoad);
    let badFiles = deleter.start();
    kLogger.print("File deleter : " + FormatColor_1.TextColor.RED + badFiles.length + FormatColor_1.TextFormat.RESET);
    let launch = await process.Launch();
    kLogger.print("Launch commande : " + FormatColor_1.TextColor.GREEN + globalLaunch.getLaunchExternalProfile());
    launch.stdout.on('data', function (data) {
        kLogger.print(data.toString());
    });
    launch.stderr.on('error', function (error) {
        kLogger.print(FormatColor_1.TextColor.RED + error.toString());
    });
})();
// (async function(){
// var mani = new ManifestGameVersion('1.12.2');
// await mani.getProperties();
// var parameters = new ParametersManager(1024, 2048 , "M");
// var dir = new DirectoryManager("C:/Users/yhgor/AppData/Roaming/.AllDeadReturnV2", "natives", "libs", "minecraft.jar", "assets");
// var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
// var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.12.2", mani.getMainClass());
// var auth = new AuthManager("Player2042", "sry", "nope");
// var globalLaunch = new Launch(java, parameters, dir, ver, auth);
// var process = new ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
// let launch = process.Launch();
// dir.getLibsWithJson("C:/Users/yhgor/AppData/Roaming/.minecraft/versions/1.18.1/1.18.1.json");
// console.log(globalLaunch.getLaunchExternalProfile());
// console.log("Lancement du jeu !");
// launch.stdout.on('data', function (data: { toString: () => any; }) {
//     console.log(data.toString());
// });
// launch.stderr.on('data', function (data: { toString: () => string; }) {
//     console.log('ERROR :' + data.toString());
// });
// })();
