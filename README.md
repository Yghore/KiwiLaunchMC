# KiwiLaunchMC
 Librairie for start the minecraft game in NodeJS

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


