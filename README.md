# KiwiLaunchMC
 Librairie for start the minecraft game in NodeJS

## Construct folder (.LauncherTest for exemple)

For construct the folder : 
- Get the jar of the version in '.minecraft/versions/{VERSION}/{VERSION}.jar
- Get all assets
- Get libs for your version (libs in the .minecraft/versions/{VERSION}/{VERSION}.json)
- Get natives in : 'https://packs.alwyn974.re/' (only natives, the libs not fix for log4j)
## Use :

Exemple : 

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

# Other informations :


