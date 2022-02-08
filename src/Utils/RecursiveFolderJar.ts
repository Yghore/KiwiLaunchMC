import path = require('path');
import fs = require('fs');

export class RecursiveFolderJar
{
    static getAllFiles = function(dirPath : string, arrayOfFiles : string[] = []) {
        var files = fs.readdirSync(dirPath)
      
        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = RecursiveFolderJar.getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
          }
        })
      
        return arrayOfFiles
      }
}