import fs = require('fs');
import util = require('util');
import { ParsedPath } from "path";
import { Logger } from "./Logger";
import { TextFormat } from './FormatColor';

export class KLogger implements Logger 
{


    private readonly PATTERN = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
    ].join('|');

    private bufferWrite: fs.WriteStream;
    
    constructor(public file: string, public prefix: string = "") 
    {
        this.bufferWrite = fs.createWriteStream(file, {flags: 'w'});
        this.bufferWrite.write("\n" + this.prefix + "NEW SESSION :" + new Date().toLocaleDateString() + "\n");
            
    }
    
    print(msg: string): void
    {

        
        msg = this.prefix + " " + msg + TextFormat.RESET;
        console.log(msg);
        
        msg = msg.replaceAll(new RegExp(this.PATTERN, "g"), "");
        this.bufferWrite.write(msg, 'utf-8');

    }

    
    
}