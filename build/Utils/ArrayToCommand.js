"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayToCommand = void 0;
class ArrayToCommand {
    static convert(arr, seperator = " ") {
        var cmd = "";
        arr.forEach(line => {
            cmd = cmd.concat(line, seperator);
        });
        return cmd;
    }
}
exports.ArrayToCommand = ArrayToCommand;
