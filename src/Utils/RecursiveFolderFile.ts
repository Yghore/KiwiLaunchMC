import * as path from "path";
import * as fs from "fs";

export class RecursiveFolderFile
{
    static getAllFiles = function(dirPath : string, arrayOfFiles : string[] = [], typeFile? : undefined|string) {
        var files = fs.readdirSync(dirPath)
      
        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = RecursiveFolderFile.getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            const pathFile = path.join(dirPath, file);
            if(typeFile == undefined)
            {
              arrayOfFiles.push(pathFile);
            }
            else
            {
              if(path.extname(pathFile) == typeFile)
              {
                arrayOfFiles.push(pathFile);
              }
              
            }
            
          }
        })
      
        return arrayOfFiles
      }
}