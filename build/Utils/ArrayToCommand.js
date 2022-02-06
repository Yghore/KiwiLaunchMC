"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayToCommand = void 0;
class ArrayToCommand {
    static convert(arr) {
        var cmd = "";
        arr.forEach(line => {
            cmd = cmd.concat(line, " ");
        });
        return cmd;
    }
}
exports.ArrayToCommand = ArrayToCommand;
