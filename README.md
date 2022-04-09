# KiwiLaunchMC
Module for start and update minecraft game in NodeJS (Write in TS)

Discord support : https://discord.gg/WsyYnWSmwE

- Log4J not fixed natively (1.17.X and older)

# Support VERSION :
    - VANILLA : 1.7.10, 1.8.X, 1.9.X, 1.10.X, 1.11.X, 1.12.X, 1.13.X, 1.14.X, 1.15.X, 1.16.X, 1.17.X, 1.18.X
    - FORGE : 1.7.10, 1.8.8, 1.12.2

## Use :

1 - Exemple (With Updater and official manifest Minecraft)


```ts


import { Launch, KLogger, Logger, DirectoryManager, GameVersion, MinecraftVersion, GameTweak, VanillaUpdater, FileDeleter, ParametersManager, JavaPath, AuthManager, ProcessManager, ProcessProfile, TextColor } from '@kiwigdc/kiwilaunch';
import * as path from "path";


(async function(){


    const kLogger = new KLogger(path.join(__dirname, "launcher_logs.log"), "[LauncherTest]");
    Logger.setLogger(kLogger);

    var dir = new DirectoryManager(path.join(DirectoryManager.DEFAULT_DIRECTORY, ".LauncherTest"), "natives", "libraries", "minecraft.jar", "assets");
    var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.18", "1.18.2");
    var vanillaUpdater = new VanillaUpdater(ver, dir);
    //var forgeUpdater = new ForgeUpdater(new ForgeVersion(ver.versionManifest, "14.23.5.2860"), dir); 
    //var deleter = new FileDeleter(dir, [], vanillaUpdater, forgeUpdater);
    var deleter = new FileDeleter(dir, [], vanillaUpdater);
    var parameters = new ParametersManager(1024, 1024 , "M");
    var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new Launch(java, parameters, dir, ver, auth);
    var processManager = new ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
    
    // Update game
    await vanillaUpdater.updateGame();

    
    // await forgeUpdater.addModWithUrl("https://xxxx.xxxxxx.fr/mods.json");
    // await forgeUpdater.addMod(new Mod("https://micdoodle8.com/new-builds/GC-1.12/280/MicdoodleCore-1.12.2-4.0.2.280.jar", "906B6088C54A428D7A383796E7B77283CCA7E573"));


    // await forgeUpdater.updateGame();


    // Deleter (that does not come from UPDATER and FORGE UPDATER, if forge updater is set.. )
    let badFiles = deleter.start();

    // Launch command for start the game
    let launch = await processManager.Launch();

    Logger.getLogger().print("Launch command : " + TextColor.GREEN + globalLaunch.getLaunchExternalProfile());

    launch.stdout.on('data', function (data: { toString: () => any; }) {
        Logger.getLogger().print(data.toString())
    });

    launch.stderr.on('error', function (error: { toString: () => string; }) {
        Logger.getLogger().print(TextColor.RED + error.toString())
    });


    



})();

```

1 - Exemple (Without Updater): 

```ts


import { Launch, KLogger, Logger, DirectoryManager, GameVersion, MinecraftVersion, GameTweak, VanillaUpdater, FileDeleter, ParametersManager, JavaPath, AuthManager, ProcessManager, ProcessProfile, TextColor } from '@kiwigdc/kiwilaunch';
import * as path from "path";


(async function(){



    const kLogger = new KLogger(path.join(__dirname, "launcher_logs.log"), "[LauncherTest]");
    Logger.setLogger(kLogger);

    var dir = new DirectoryManager(path.join(DirectoryManager.DEFAULT_DIRECTORY, ".LauncherTest"), "natives", "libraries", "minecraft.jar", "assets");
    var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.18", "1.18.2");
    var parameters = new ParametersManager(1024, 1024 , "M");
    var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new Launch(java, parameters, dir, ver, auth);
    var processManager = new ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
    


    // Launch command for start the game
    let launch = await processManager.Launch();

    Logger.getLogger().print("Launch command : " + TextColor.GREEN + globalLaunch.getLaunchExternalProfile());

    launch.stdout.on('data', function (data: { toString: () => any; }) {
        Logger.getLogger().print(data.toString())
    });

    launch.stderr.on('error', function (error: { toString: () => string; }) {
        Logger.getLogger().print(TextColor.RED + error.toString())
    });


    



})();



```

# Other informations :

## Logger :

### Logger color :

Enum's exist for color in console : ``TextColor``, ``BGColor`` and ``TextFormat``.

### Without logger :

```ts
if(Logger.logger == undefined){Logger.logger = {print(msg: string){console.log(msg)}}}
// Logger = console.log(msg);
```

### Exemple of custom logger :

```ts
class KLogger extends Logger 
{
    // Called for every logs
    print(msg: string) : void
    {
        // Write file,
        // Launch in space
        // etc...
        console.log("MY CUSTOM LOGGER | " + msg);
    }
```


## Dynamic json file for self-hosted mods : 

This php script generates a json : 
```php
<?php

$file = "mods/"; // Path to the mods folder
$url = "http://localhost/"; // URL to the mods folder

$json = array();
if ($handle = opendir($file)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && !is_dir($entry)) {
            $mod = array("url" => $url . $file . $entry, "sha1" => sha1_file($file . $entry));
            array_push($json, $mod);
        }
    }
    closedir($handle);
}

echo json_encode($json);

?>

```

## Security of FileDeleter

The fileDeleter is not a secure for cheater and other hack, because the client maybe a other launcher
for forced mods list use (for exemple) : [WatchDog Anti Cheat mod](https://www.curseforge.com/minecraft/mc-mods/watchdog-anti-cheat)