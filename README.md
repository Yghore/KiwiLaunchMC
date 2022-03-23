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

const KLaunch = require('@kiwigdc/kiwilaunch')




(async function(){



    const kLogger = new KLogger(path.join(__dirname, "launcher_logs.log"), "[LauncherTest]");
    Logger.setLogger(kLogger);

    var dir = new DirectoryManager(path.join(DirectoryManager.DEFAULT_DIRECTORY, ".LauncherTest"), "natives", "libraries", "minecraft.jar", "assets");
    var ver = new GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.12", "1.12.2");
    var vanillaUpdater = new VanillaUpdater(ver, dir);
    var deleter = new FileDeleter(dir, [], vanillaUpdater);
    var parameters = new ParametersManager(1024, 1024 , "M");
    var java = new JavaPath("java"); // Use java or directory (bin/java is add into class)
    var auth = new AuthManager("Player2042", "sry", "nope");
    var globalLaunch = new Launch(java, parameters, dir, ver, auth);
    var processManager = new ProcessManager(globalLaunch, ProcessProfile.INTERNAL);
    
    // Update game
    await vanillaUpdater.updateGame();

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

const KLaunch = require('@kiwigdc/kiwilaunch')

// Default logger :
const kLogger = new KLogger(path.join(__dirname, "launcher_logs.log"), "[LauncherTest]");
Logger.setLogger(kLogger);

var dir = new KLaunch.DirectoryManager(path.join(DirectoryManager.DEFAULT_DIRECTORY, ".LauncherTest"), "natives", "libs", "minecraft.jar", "assets");
var ver = new KLaunch.GameVersion(MinecraftVersion.V1_8_HIGHER, GameTweak.VANILLA, "1.12", "1.12.2");


var parameters = new KLaunch.ParametersManager(1024, 2048 , "M");
var java = new KLaunch.JavaPath("java"); // Use java or directory (bin/java is add into class)
var auth = new KLaunch.AuthManager("Player2042", "sry", "nope");
var globalLaunch = new KLaunch.Launch(java, parameters, dir, ver, auth);
var process = new KLaunch.ProcessManager(globalLaunch, ProcessProfile.INTERNAL);

let launch = await processManager.Launch();


Logger.getLogger().print("Launch commande : " + TextColor.GREEN + globalLaunch.getLaunchExternalProfile());

launch.stdout.on('data', function (data: { toString: () => any; }) {
    Logger.getLogger().print(data.toString())
});

launch.stderr.on('error', function (error: { toString: () => string; }) {
    Logger.getLogger().print(TextColor.RED + error.toString())
});




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

