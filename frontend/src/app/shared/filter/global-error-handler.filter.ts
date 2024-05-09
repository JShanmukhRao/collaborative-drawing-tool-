import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    constructor() {
    }
    handleError(error: any) {
        const message = error?.error?.error[0]?.message || "Something went wrong";
        alert(message); 
    }
}