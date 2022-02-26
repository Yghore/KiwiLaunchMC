# KiwiLaunchMC
 Librairie for start the minecraft game in NodeJS

## Construct folder (.LauncherTest for exemple)

Construct the folder (if you doesn't want use updater): 
- Get the jar of the version in '.minecraft/versions/{VERSION}/{VERSION}.jar
- Get all assets
- Get libs for your version (libs in the .minecraft/versions/{VERSION}/{VERSION}.json)
- Get natives in : 'https://packs.alwyn974.re/' (only natives, the libs not fix for log4j)
## Use :

1 - Exemple (Without Updater): 

```ts

const KLaunch = require('@kiwigdc/kiwilaunch')

var parameters = new KLaunch.ParametersManager(1024, 2048 , "M");
var dir = new KLaunch.DirectoryManager("C:/Users/yhgor/AppData/Roaming/.LauncherTest", "natives", "libs", "minecraft.jar", "assets");
var java = new KLaunch.JavaPath(dir.gameDir + "/JAVA/"); // Use java or directory (/bin/java.exe is add into class)
var ver = new KLaunch.GameVersion(KLaunch.MinecraftVersion.V1_8_HIGHER, KLaunch.GameTweak.FORGE, "1.12.2");
var auth = new KLaunch.AuthManager("Player2042", "sry", "nope");

var cmd = new KLaunch.Launch(java, parameters, dir, ver, auth);


console.log(cmd.launch()); // Print the fully command (Not execute for the moment)

```

2 - Exemple (With Updater, WITH official MANISFEST Minecraft)
PS : 
    - The updater, re-download the ALL FILES in every start (to be fixed in a future... )
    - Vanilla support Only (forge, optifine to be added in a future... )
    - Extra of the player is not delete .. (to be fixed in a future... )

```ts


(async function(){

    const KLaunch = require('@kiwigdc/kiwilaunch')

    var dir = new KLaunch.DirectoryManager("C:/Users/yhgor/AppData/Roaming/.LauncherTest", "natives", "libs", "minecraft.jar", "assets");
    var ver = new KLaunch.GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.12", "1.12.2");
    var mani = new KLaunch.VanillaUpdater(ver, dir);
    var parameters = new KLaunch.ParametersManager(1024, 2048 , "M");
    var java = new KLaunch.JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new KLaunch.AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new KLaunch.Launch(java, parameters, dir, ver, auth);
    var process = new KLaunch.ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
    
    
    await mani.setManisfest();
    await mani.updateGame();

    let launch = process.Launch();


    console.log(globalLaunch.getLaunchExternalProfile());
    console.log("Start game !");

    launch.stdout.on('data', function (data: { toString: () => any; }) {
        console.log(data.toString());
    });

    launch.stderr.on('data', function (data: { toString: () => string; }) {
        console.log('ERROR :' + data.toString());
    });


    



})();

```


# Other informations :


