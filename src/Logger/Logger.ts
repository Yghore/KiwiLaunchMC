export abstract class Logger 
{
    /**
     * Static logger for different class
     */
    private static logger : Logger;
    
    constructor(){}


    
    static getLogger() : Logger
    {
        if(Logger.logger == undefined){Logger.logger = {print(msg: string){console.log(msg)}}}
        return Logger.logger;
    }

    static setLogger(log : Logger) 
    {
        this.logger = log;
    }

    /**
     * Call for print/logs 
     * @param msg Message 
     */
    abstract print(msg: string) : void;


}