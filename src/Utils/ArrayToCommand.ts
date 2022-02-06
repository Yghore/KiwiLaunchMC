export class ArrayToCommand {
    static convert(arr : string[]) : string
    {
        var cmd = "";
        arr.forEach(line => {
            cmd = cmd.concat(line, " ");
        });
        return cmd;
    }
}