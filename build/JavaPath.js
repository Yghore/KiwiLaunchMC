"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaPath = void 0;
class JavaPath {
    javaPath;
    constructor(javaPath) {
        this.javaPath = javaPath;
        if (javaPath === "default" || javaPath === "java") {
            this.javaPath = "java ";
        }
        else {
            this.javaPath = javaPath.concat('bin/java.exe');
        }
    }
    /**
     * getJavaPath
     */
    getJavaPath() {
        return [this.javaPath];
    }
}
exports.JavaPath = JavaPath;
