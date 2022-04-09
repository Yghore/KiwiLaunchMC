import * as fs from 'fs';
import { Logger } from "./Logger";
import { TextColor, TextFormat } from './FormatColor';

export class KLogger extends Logger 
{




    private readonly PATTERN = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
    ].join('|');

    private bufferWrite: fs.WriteStream;
    
    /**
     * Construct a new file logs and write the date
     * @param file used file for write logs
     * @param prefix prefix for every logs
     */
    constructor(public file: string, public prefix: string = "") 
    {
        super();
        let date = new Date();
        this.bufferWrite = fs.createWriteStream(file, {flags: 'w'});
        this.bufferWrite.write("\n" + this.prefix + " SESSION :" + date.toLocaleDateString() + " - " + date.toLocaleTimeString() + "\n");
        
            
    }
    
    /**
     * called for every logs
     * @param msg message logged
     */
    print(msg: string): void
    {

        
        msg = this.prefix + " " + msg + TextFormat.RESET;
        console.log(msg);

        msg = msg.replaceAll(new RegExp(this.PATTERN, "g"), "");
        this.bufferWrite.write(msg + "\n", 'utf-8');
    

    }

    debug(msg: string): void
    {
        msg = "DEBUG\n" + TextColor.RED +  msg + "\n";
        console.debug(msg);
    }

    public static getLogger()
    {
        return super.getLogger();
    }

    
    
}