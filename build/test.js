"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManifestGameVersion_1 = require("./Updater/ManifestGameVersion");
var mani = new ManifestGameVersion_1.ManifestGameVersion('1.12.2');
mani.getProperties().then((properties) => {
    console.log(properties);
    console.log("COUCOU 1");
});
console.log("COUCOU 2");
// var parameters = new ParametersManager(1024, 2048 , "M");
// var dir = new DirectoryManager("C:/Users/yhgor/AppData/Roaming/.AllDeadReturnV2", "natives", "libs", "minecraft.jar", "assets");
// var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
// var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.12.2");
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
