export declare class ParametersManager {
    minRam: number;
    maxRam: number;
    size: string;
    private minRamParam;
    private maxRamParam;
    /**
     *
     * @param minRam    (MIN = 1024)
     * @param maxRam  (MAX = 16384)
     * @param size "Style of the size, 'M' for MO AND 'G' for 'G'"
     * exemple : (3, 16, "G");
     */
    constructor(minRam: number, maxRam: number, size?: string);
    /**
     * getOptionalArguments
     */
    getOptionalParameters(): string[];
    getRamParameters(): string[];
}
