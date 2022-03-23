import { ManifestVanillaVersion } from "./ManifestVanillaVersion";

export interface ManifestForgeVersion extends ManifestVanillaVersion 
{
    forgeProperties: any;
    /**
     * allFiles downloaded/checked used by fileDeleted;
     */

}