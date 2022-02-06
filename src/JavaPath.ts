import fs = require('fs');

export class JavaPath {

    constructor(public javaPath : string)
    {
        if(javaPath === "default" || javaPath === "java")
        {
            this.javaPath = "java ";
        }
        else
        {

            this.javaPath = javaPath.concat('bin/java.exe ');
            
        }
            
        
        

    }

    /**
     * getJavaPath  
     */
    public getJavaPath() {
        return this.javaPath;
    }

}