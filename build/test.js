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
(async function () {
    var dir = new DirectoryManager_1.DirectoryManager("C:/Users/yhgor/AppData/Roaming/.LauncherTest", "natives", "libraries", "versions/1.18.1/1.18.1.jar", "assets");
    var ver = new GameVersion_1.GameVersion(MinecraftVersion_1.MinecraftVersion.V1_17_HIGHER, GameTweak_1.GameTweak.FORGE, "1.18", "1.18.1");
    var vanillaUpdater = new VanillaUpdater_1.VanillaUpdater(ver, dir);
    var forgeUpdater = new ForgeUpdater_1.ForgeUpdater(new ForgeVersion_1.ForgeVersion(ver.versionManisfest, "39.0.87"), dir);
    var deleter = new FileDeleter_1.FileDeleter(dir, vanillaUpdater);
    var parameters = new ParametersManager_1.ParametersManager(1024, 1024, "M", ["-DignoreList=bootstraplauncher,securejarhandler,asm-commons,asm-util,asm-analysis,asm-tree,asm,client-extra,fmlcore,javafmllanguage,mclanguage,forge-,1.18.1.jar",
        "-DmergeModules=jna-5.8.0.jar,jna-platform-58.0.jar,java-objc-bridge-1.0.0.jar",
        "-DlibraryDirectory=C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries",
        "-p",
        "C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries/cpw/mods/bootstraplauncher/1.0.0/bootstraplauncher-1.0.0.jar;C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries/cpw/mods/securejarhandler/1.0.1/securejarhandler-1.0.1.jar;C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries/org/ow2/asm/asm-commons/9.2/asm-commons-9.2.jar;C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries/org/ow2/asm/asm-util/9.2/asm-util-9.2.jar;C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries/org/ow2/asm/asm-analysis/9.2/asm-analysis-9.2.jar;C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries/org/ow2/asm/asm-tree/9.2/asm-tree-9.2.jar;C:/Users/yhgor/AppData/Roaming/.LauncherTest/libraries/org/ow2/asm/asm/9.2/asm-9.2.jar",
        "--add-modules",
        "ALL-MODULE-PATH",
        "--add-opens",
        "java.base/java.util.jar=cpw.mods.securejarhandler",
        "--add-exports",
        "java.base/sun.security.util=cpw.mods.securejarhandler",
        "--add-exports",
        "jdk.naming.dns/com.sun.jndi.dns=java.naming",
        "--launchTarget",
        "forgeclient",
        "--fml.forgeVersion",
        "39.0.87",
        "--fml.mcVersion",
        "1.18.1",
        "--fml.forgeGroup",
        "net.minecraftforge",
        "--fml.mcpVersion",
        "20211210.034407"]);
    var java = new JavaPath_1.JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new AuthManager_1.AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new Launch_1.Launch(java, parameters, dir, ver, auth);
    var process = new ProcessManager_1.ProcessManager(globalLaunch, ProcessProfile_1.ProcessProfile.INTERNAL);
    await vanillaUpdater.setManisfest();
    await vanillaUpdater.updateGame();
    console.log("FORGE UPDATER :");
    await forgeUpdater.updateGame();
    dir.setLibs(vanillaUpdater.libsLoad);
    let launch = await process.Launch();
    console.log(globalLaunch.getLaunchExternalProfile());
    console.log("Lancement du jeu !");
    launch.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    launch.stderr.on('data', function (data) {
        console.log('ERROR :' + data.toString());
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
