import { AuthManager } from "./AuthManager";
import { DirectoryManager } from "./DirectoryManager";
import { GameTweak } from "./GameTweak";
import { GameVersion } from "./Version/GameVersion";
import { JavaPath } from "./JavaPath";
import { Launch } from "./Launch";
import { MinecraftVersion } from "./Version/MinecraftVersion";
import { ParametersManager } from "./ParametersManager";
import { ProcessManager } from "./ProcessManager";
import { ProcessProfile } from "./ProcessProfile";
import { FileDeleter } from "./Updater/FileDeleter";
import { VanillaUpdater } from "./Updater/VanillaUpdater";
import { ForgeUpdater } from "./Updater/ForgeUpdater";
import { ForgeVersion } from "./Version/ForgeVersion";

(async function(){

    var dir = new DirectoryManager("C:/Users/yhgor/AppData/Roaming/.LauncherTest", "natives", "libraries", "minecraft.jar", "assets");
    var ver = new GameVersion(MinecraftVersion.V1_17_HIGHER, GameTweak.VANILLA, "1.18", "1.18.2");
    var vanillaUpdater = new VanillaUpdater(ver, dir);
    var forgeUpdater = new ForgeUpdater(new ForgeVersion(ver.versionManisfest, "40.0.12"), dir);
    var deleter = new FileDeleter(dir, [], vanillaUpdater, forgeUpdater);
    var parameters = new ParametersManager(1024, 1024 , "M");
    var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new Launch(java, parameters, dir, ver, auth);
    var process = new ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
    
    
    await vanillaUpdater.setManisfest();
    await vanillaUpdater.updateGame();

    await forgeUpdater.updateGame();

    //dir.setLibs(vanillaUpdater.libsLoad);

    console.log("Bad file : " + deleter.start());

    // let launch = await process.Launch();


    // console.log(globalLaunch.getLaunchExternalProfile());
    // console.log("Lancement du jeu !");

    // launch.stdout.on('data', function (data: { toString: () => any; }) {
    //     console.log(data.toString());
    // });

    // launch.stderr.on('data', function (data: { toString: () => string; }) {
    //     console.log('ERROR :' + data.toString());
    // });


    



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
