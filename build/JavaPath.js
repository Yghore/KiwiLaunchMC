"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaPath = void 0;
const path = require("path");
const FormatColor_1 = require("./Logger/FormatColor");
const Logger_1 = require("./Logger/Logger");
class JavaPath {
    /**
     * Create the path of java (Path variable works)
     * @param javaPath - java or directory ('/bin/java' is add in class)
     */
    constructor(javaPath) {
        this.javaPath = javaPath;
        if (javaPath === "default" || javaPath === "java") {
            Logger_1.Logger.getLogger().print("Default java path");
            this.javaPath = "java";
        }
        else {
            Logger_1.Logger.getLogger().print("Custom java path: " + FormatColor_1.TextColor.GREEN + path.join(this.javaPath, 'bin/java'));
            this.javaPath = path.join(this.javaPath, 'bin/java');
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
