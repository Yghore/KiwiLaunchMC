"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametersManager = void 0;
class ParametersManager {
    /**
     *
     * @param minRam    (MIN = 1024)
     * @param maxRam  (MAX = 16384)
     * @param size "Style of the size, 'M' for MO AND 'G' for 'G'"
     * exemple : (3, 16, "G");
     */
    constructor(minRam, maxRam, size = "M", extra) {
        this.minRam = minRam;
        this.maxRam = maxRam;
        this.size = size;
        this.extra = extra;
        if (this.maxRam < this.minRam) {
            throw new Error("minRam > MaxRam : (Impossible)");
        }
        // -Xms1536M 
        // -Xmx2048M 
        if (size === "M") {
            const MAX_SIZE = 16384;
            const MIN_SIZE = 1024;
            if (this.minRam <= MAX_SIZE && this.minRam >= MIN_SIZE) {
                if (Math.log2(this.minRam) % 1 === 0) {
                    this.minRamParam = "-Xms" + this.minRam + "M";
                }
                else {
                    throw new Error("The MinRam is not a Power of 2");
                }
            }
            else {
                throw new Error("Minimum Ram options : " + MIN_SIZE + " Maximum Ram options : " + MAX_SIZE);
            }
            if (this.maxRam <= MAX_SIZE && this.maxRam >= MIN_SIZE) {
                if (Math.log2(this.maxRam) % 1 === 0) {
                    this.maxRamParam = "-Xmx" + this.maxRam + "M";
                }
                else {
                    throw new Error("The MaxRam is not a Power of 2");
                }
            }
            else {
                throw new Error("Minimum Ram options : " + MIN_SIZE + " Maximum Ram options : " + MAX_SIZE);
            }
        }
        else {
            const MAX_SIZE = 16;
            const MIN_SIZE = 1;
            if (this.minRam <= MAX_SIZE && this.minRam >= MIN_SIZE) {
                this.minRamParam = "-Xms" + this.minRam + "G";
            }
            else {
                throw new Error("Minimum Ram options : " + MIN_SIZE + " Maximum Ram options : " + MAX_SIZE);
            }
            if (this.maxRam <= MAX_SIZE && this.maxRam >= MIN_SIZE) {
                this.maxRamParam = "-Xmx" + this.maxRam + "G";
            }
            else {
                throw new Error("Minimum Ram options : " + MIN_SIZE + " Maximum Ram options : " + MAX_SIZE);
            }
        }
    }
    /**
     * getOptionalArguments
     */
    getOptionalParameters() {
        return ['-XX:+UseConcMarkSweepGC',
            '-XX:+CMSIncrementalMode',
            '-XX:-UseAdaptiveSizePolicy',
            '-Dfml.ignoreInvalidMinecraftCertificates=true',
            '-Dfml.ignorePatchDiscrepancies=true',
            '-XX:+IgnoreUnrecognizedVMOptions'
        ];
    }
    getExtraParameters() {
        return this.extra == undefined ? [] : this.extra;
    }
    getRamParameters() {
        return [this.minRamParam, this.maxRamParam];
    }
}
exports.ParametersManager = ParametersManager;
