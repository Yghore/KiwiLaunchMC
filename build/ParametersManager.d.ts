export declare class ParametersManager {
    minRam: number;
    maxRam: number;
    size: string;
    private minRamParam;
    private maxRamParam;
    constructor(minRam: number, maxRam: number, size?: string);
    /**
     * getOptionalArguments
     */
    getOptionalParameters(): string[];
    getRamParameters(): string[];
}
