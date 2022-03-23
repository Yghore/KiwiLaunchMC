import { Launch } from "./Launch";
import { ProcessProfile } from "./ProcessProfile";
import { exec, spawn} from "child_process"; 
import { Logger } from "./Logger/Logger";



export class ProcessManager {

    private process;

    constructor(public launch : Launch, public profile : ProcessProfile) 
    {}

    public async Launch()
    {
        if(this.profile === ProcessProfile.EXTERNAL)
        {
            Logger.getLogger().print("Launch profile : External");
            this.process = exec(this.launch.getLaunchExternalProfile(), {cwd: this.launch.directoryManager.gameDir}, (error, data, getter) => {
				if(error){
					throw new Error(`Error in start : ${error.message}`);
				}
	
			});
            return this.process;
        }
        else
        {
            Logger.getLogger().print("Launch profile: Internal");
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