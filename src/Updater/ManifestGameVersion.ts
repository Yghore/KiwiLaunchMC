interface ManifestGameVersion {
    gameProperties;
    /**
     * Check if the files is good (CHECKSUM, FILES EXISTS, ETC... and download files) 
     * @param url url of file
     * @param hash hash of file
     * @param dist destination of file;
     * @returns If file is re-downloaded
     */
    checkDownloadFiles(url : string, hash : string, dist: string) : Promise<boolean>;
}