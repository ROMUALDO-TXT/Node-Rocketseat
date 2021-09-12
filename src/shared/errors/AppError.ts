class AppError{
    public readonly message: string;
    public readonly statusCode: number;
    
    constructor(message: string, statusCode?: number | undefined){
        this.message = message;
        if(!statusCode){
            this.statusCode = 500;
        }else{
            this.statusCode = statusCode;
        }
    }
}

export { AppError }