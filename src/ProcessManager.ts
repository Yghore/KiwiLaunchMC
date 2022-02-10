import { Launch } from "./Launch";
import { ProcessProfile } from "./ProcessProfile";
import { exec, spawn} from "child_process"; 

export class ProcessManager {

    private process;
    constructor(public launch : Launch, public profile : ProcessProfile) 
    {}

    public Launch()
    {
        if(this.profile === ProcessProfile.EXTERNAL)
        {
            console.log("Lancement du jeu en EXTERNAL Profile");
            this.process = exec(this.launch.getLaunchExternalProfile(), {cwd: this.launch.directoryManager.gameDir}, (error, data, getter) => {
				if(error){
					throw new Error(`Error in start : ${error.message}`);
				}
	
			});
            return this.process;
        }
        else
        {
            console.log("Lancement du jeu en INTERNAL Profile");
            var commandInternal : string[] = this.launch.getLaunchInternalProfile();
			var javaCommand : string = commandInternal.splice(0, 1)[0];
			this.process = spawn(javaCommand, commandInternal, {cwd: this.launch.directoryManager.gameDir});
            return this.process;
        }
    }



    /**
     * getProcess
     */
    public getProcess() 
    {
        return this.process;    
    }

}