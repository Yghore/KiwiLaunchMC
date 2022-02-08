export class ArrayToCommand {
    static convert(arr : string[], seperator: string = " ") : string
    {
        var cmd = "";
        arr.forEach(line => {
            cmd = cmd.concat(line, seperator);
        });
        return cmd;
    }


}