import * as path from "path";

export class JavaPath {

    /**
     * Create the path of java (Path variable works)
     * @param javaPath - java or directory ('/bin/java' is add in class)
     */
    constructor(public javaPath : string)
    {
        if(javaPath === "default" || javaPath === "java")
        {
            this.javaPath = "java";
        }
        else
        {

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