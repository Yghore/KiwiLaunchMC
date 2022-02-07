import fs = require('fs');

export class JavaPath {

    /**
     * Create the path of java (Path variable works)
     * @param javaPath - java or directory ('/bin/java.exe' is add in class)
     */
    constructor(public javaPath : string)
    {
        if(javaPath === "default" || javaPath === "java")
        {
            this.javaPath = "java ";
        }
        else
        {

            this.javaPath = javaPath.concat('bin/java.exe');
            
        }
            
        
        

    }

    /**
     * getJavaPath  
     */
    public getJavaPath() : string[] {
        return [this.javaPath];
    }

}