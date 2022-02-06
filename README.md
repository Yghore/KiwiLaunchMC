# KiwiLaunchMC
 Librairie for start the minecraft game in NodeJS

## Use :

Exemple : 

```ts
import path = require("path");
import { AuthManager } from "./AuthManager";
import { DirectoryManager } from "./DirectoryManager";
import { GameTweak } from "./GameTweak";
import { GameVersion } from "./GameVersion";
import { JavaPath } from "./JavaPath";
import { Launch } from "./Launch";
import { MinecraftVersion } from "./MinecraftVersion";
import { ParametersManager } from "./ParametersManager";



var parameters = new ParametersManager(1024, 2048 , "M");
var dir = new DirectoryManager("C:/Users/yhgor/AppData/Roaming/.LauncherTest", "natives", "libs", "minecraft.jar", "assets");
var java = new JavaPath(dir.gameDir + "/JAVA/"); // Use java or directory (/bin/java.exe is add into class)
var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.FORGE, "1.12.2");
var auth = new AuthManager("Player2042", "sry", "nope");

var cmd = new Launch(java, parameters, dir, ver, auth);


console.log(cmd.launch()); // Print the fully command (Not execute for the moment)

```

# Other informations :


