import { GameTweak } from "./GameTweak";
import { MinecraftVersion } from "./MinecraftVersion";

export class GameVersion {

    
    private tweaker : string | null;
    private mainClass : string = "net.minecraft.launchwrapper.Launch ";
    

    /**
     * 
     * @param version The version of Minecraft (use Enum MinecraftVersion)
     * @param tweak The GameTweak (System of minecraft, forge, vanilla, etc... use Enum GameTweak)
     * @param versionIndex The version of games (1.12.2, 1.8.8, etc...)
     */
    constructor(public version : MinecraftVersion, public tweak : GameTweak, public versionIndex : string) {
        if(tweak == GameTweak.FORGE)
        {
            if(version == MinecraftVersion.V1_7_10)
            {
                this.tweaker = "cpw.mods.fml.common.launcher.FMLTweaker";
            }
            else if(version == MinecraftVersion.V1_8_HIGHER)
            {
                this.tweaker = "net.minecraftforge.fml.common.launcher.FMLTweaker";
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
        return ["--tweakClass", this.tweaker];
    }


    public getVersionParameter() : string[]
    {
        return ["--version", this.versionIndex];
    }



    public getAssetIndexParameter() : string[]
    {
        return ["--assetIndex", this.versionIndex];
    }







}