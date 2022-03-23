import * as path from "path";
import * as fs from "fs";

export class RecursiveFolderFile
{
    static getAllFiles(dirPath : string, arrayOfFiles : string[] = [], typeFile? : undefined|string, excludes?: undefined|string[]) {
        var files = fs.readdirSync(dirPath)
      
        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if(excludes == undefined)
          {
            if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
              arrayOfFiles = RecursiveFolderFile.getAllFiles(dirPath + "/" + file, arrayOfFiles, typeFile)
            } else if(fs.statSync(path.join(dirPath, file)).isFile()) {
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
          }

          else if(!excludes.includes(path.join(dirPath, file))) 
          {
            if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
              arrayOfFiles = RecursiveFolderFile.getAllFiles(dirPath + "/" + file, arrayOfFiles, typeFile, excludes)
            } else if(fs.statSync(path.join(dirPath, file)).isFile()) {
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
          }
        
        })
      
        return arrayOfFiles
      }

    
    
}