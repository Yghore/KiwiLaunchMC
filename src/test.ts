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
import { KLogger } from "./Logger/KLogger";
import * as path from "path";
import { TextColor, TextFormat, BGColor} from "./Logger/FormatColor";
import { Logger } from "./Logger/Logger";

(async function(){



    const kLogger = new KLogger(path.join(__dirname, "launcher_logs.log"), "[LauncherTest]");
    Logger.setLogger(kLogger);

    var dir = new DirectoryManager(path.join(DirectoryManager.DEFAULT_DIRECTORY, ".LauncherTest"), "natives", "libraries", "minecraft.jar", "assets");
    var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.12", "1.12.2");
    var vanillaUpdater = new VanillaUpdater(ver, dir);
    var forgeUpdater = new ForgeUpdater(new ForgeVersion(ver.versionManifest, "14.23.5.2860"), dir);
    var deleter = new FileDeleter(dir, [], vanillaUpdater, forgeUpdater);
    var parameters = new ParametersManager(1024, 1024 , "M");
    var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new Launch(java, parameters, dir, ver, auth);
    var processManager = new ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
    
    
    await vanillaUpdater.updateGame();

    //await forgeUpdater.updateGame();

    //dir.setLibs(vanillaUpdater.libsLoad);

    let badFiles = deleter.start();

    

    let launch = await processManager.Launch();


    Logger.getLogger().print("Launch commande : " + TextColor.GREEN + globalLaunch.getLaunchExternalProfile());

    launch.stdout.on('data', function (data: { toString: () => any; }) {
        Logger.getLogger().print(data.toString())
    });

    launch.stderr.on('error', function (error: { toString: () => string; }) {
        Logger.getLogger().print(TextColor.RED + error.toString())
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
