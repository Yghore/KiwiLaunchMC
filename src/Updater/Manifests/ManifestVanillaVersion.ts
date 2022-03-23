interface ManifestVanillaVersion {

    
    getAllFiles();

    gameVersion: any;

    /**
     * Informations of games
     */
    gameProperties: any;
    /**
     * allFiles downloaded/checked used by fileDeleted;
     */
    allFiles : string[];
    /**
     * Directory of games
     */
    dir : any;
    /**
     * Check if the files is good (CHECKSUM, FILES EXISTS, ETC... and download files) 
     * @param url url of file
     * @param hash hash of file
     * @param dist destination of file;
     * @returns If file is re-downloaded
     */
    checkDownloadFiles(url : string, hash : string, dist: string) : Promise<boolean>;

    /**
     * Extract natives (.dll or .so) in natives directory 
     * @param filePath File for extracted
     */
    extractNatives(filePath : string) : Promise<void>;

    /**
     * For get all informations for downloads, update, checksum...
     * Content : downloads, name, sha1, date...
     */
    setManisfest(): Promise<any>;

    /**
     * Update the game (launch all methods download and extract)
     */

    updateGame() : Promise<void>;

    /**
     * Downloads assets
     */

    downloadAssetsFiles() : Promise<void>;


    /**
     * Downloads libraries files;
     */

    downloadsLibrariesFiles() : Promise<void>;

    /**
     * Downloads client files;
     */

    downloadClientJarFiles() : Promise<void>;

    
}


