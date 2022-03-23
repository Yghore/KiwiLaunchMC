import * as path from "path";
import { TextColor } from "./Logger/FormatColor";
import { Logger } from "./Logger/Logger";

export class JavaPath {

    /**
     * Create the path of java (Path variable works)
     * @param javaPath - java or directory ('/bin/java' is add in class)
     */
    constructor(public javaPath : string)
    {
        if(javaPath === "default" || javaPath === "java")
        {
            Logger.getLogger().print("Default java path");
            this.javaPath = "java";
        }
        else
        {   
            Logger.getLogger().print("Custom java path: " + TextColor.GREEN + path.join(this.javaPath, 'bin/java'));
            this.javaPath = path.join(this.javaPath, 'bin/java');
            
        }
            
        
        

    }

    /**
     * getJavaPath  
     */
    public getJavaPath() : string[] {
        return [this.javaPath];
    }

}