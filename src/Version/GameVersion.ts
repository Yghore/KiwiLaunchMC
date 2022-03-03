import { GameTweak } from "../GameTweak";
import { MinecraftVersion } from "./MinecraftVersion";

export class GameVersion {

    public mainClass : string = "net.minecraft.client.main.Main";
    private tweaker : string | null;    

    
    // 1.13.2 ou plus haut avec forge : 'cpw.mods.modlauncher.Launcher'

    // 1.8 ou plus haut : 'net.minecraft.client.main.Main'
    // 1.7.2 ou plus bas : 'net.minecraft.client.main.Main'
    // 1.5.2 ou plus bas : 'net.minecraft.launchwrapper.Launch'

    /**
     * 
     * @param version The version of Minecraft (use Enum MinecraftVersion)
     * @param tweak The GameTweak (System of minecraft, forge, vanilla, etc... use Enum GameTweak)
     * @param versionIndex The version of games (1.12.2, 1.8.8, etc...)
     */
    constructor(public version : MinecraftVersion, public tweak : GameTweak, public versionIndex : string, public versionManisfest : string) {
        if(tweak == GameTweak.FORGE)
        {   
            if(version == MinecraftVersion.V1_17_HIGHER)
            {
                this.mainClass = "cpw.mods.bootstraplauncher.BootstrapLauncher";
            }
            if(version == MinecraftVersion.V1_13_2_HIGHER)
            {
                this.mainClass = 'cpw.mods.modlauncher.Launcher';
            }
            if(version == MinecraftVersion.V1_7_10)
            {
                this.tweaker = "cpw.mods.fml.common.launcher.FMLTweaker";
            }
            else if(version == MinecraftVersion.V1_8_HIGHER)
            {
                this.tweaker = "net.minecraftforge.fml.common.launcher.FMLTweaker";
                this.mainClass = "net.minecraft.launchwrapper.Launch";
            }
        }
        else
        {
            this.tweak = null;
        }

        
    }

    public getMainClass() : string[]
    {
        return [this.mainClass];
    }


    public getTweakerParameter() : string[]
    {
        if(this.tweaker != undefined)
        {
            return ["--tweakClass", this.tweaker];
        }
        return [];
        
    }


    public getVersionParameter() : string[]
    {
        return ["--version", this.versionManisfest];
    }



    public getAssetIndexParameter() : string[]
    {
        return ["--assetIndex", this.versionIndex];
    }







}