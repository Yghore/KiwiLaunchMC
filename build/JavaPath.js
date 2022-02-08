"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaPath = void 0;
class JavaPath {
    javaPath;
    /**
     * Create the path of java (Path variable works)
     * @param javaPath - java or directory ('/bin/java' is add in class)
     */
    constructor(javaPath) {
        this.javaPath = javaPath;
        if (javaPath === "default" || javaPath === "java") {
            this.javaPath = "java";
        }
        else {
            this.javaPath = javaPath.concat('bin/java');
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
