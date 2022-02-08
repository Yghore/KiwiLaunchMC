import path = require("path");
import { AuthManager } from "./AuthManager";
import { DirectoryManager } from "./DirectoryManager";
import { GameTweak } from "./GameTweak";
import { GameVersion } from "./GameVersion";
import { JavaPath } from "./JavaPath";
import { Launch } from "./Launch";
import { MinecraftVersion } from "./MinecraftVersion";
import { ParametersManager } from "./ParametersManager";
import { ProcessManager } from "./ProcessManager";
import { ProcessProfile } from "./ProcessProfile";



var parameters = new ParametersManager(1024, 2048 , "M");
var dir = new DirectoryManager("C:/Users/yhgor/AppData/Roaming/.minecraft", "natives", "libraries", "versions/1.12.2/1.12.2.jar", "assets");
var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.12.2");
var auth = new AuthManager("Player2042", "sry", "nope");
var globalLaunch = new Launch(java, parameters, dir, ver, auth);
var process = new ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
let launch = process.Launch();


console.log(globalLaunch.getLaunchExternalProfile());
console.log("Lancement du jeu !");

launch.stdout.on('data', function (data: { toString: () => any; }) {
    console.log(data.toString());
});

launch.stderr.on('data', function (data: { toString: () => string; }) {
    console.log('ERROR :' + data.toString());
    });


