import path = require("path");

export interface Logger 
{
    file: string;
    
    print(msg: string, format: any[]) : void;


}