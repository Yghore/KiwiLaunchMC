export class ProgressBar {
    
    public max : number;
    public actually: number;

    public static ProgressBar;
    public static funcUpdate;

    public static getProgressBar() {
        if(ProgressBar.ProgressBar == null) {
            throw new Error("ProgressBar not initialized");
        }
        return ProgressBar.ProgressBar;
    }

    constructor(){}

    public add()
    {
        this.actually++;
        this.onUpdate(ProgressBar.funcUpdate());
        
    }

    public onUpdate(callback : Function)
    {
        ProgressBar.funcUpdate = callback;
        callback();
    }


    public setMax(max : number)
    {
        this.max = max;
    }

    public getProgress() : number
    {
        return this.actually / this.max;
    }

    public static setProgressBar(progressBar : ProgressBar)
    {
        ProgressBar.ProgressBar = progressBar;
    }

}