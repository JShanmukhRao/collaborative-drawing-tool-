import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor() {
    }
    handleError(error: any) {
        console.error('Error from global error handler', error);
        const message = error?.error?.error[0]?.response?.message || error?.message || "An error occurred. Please try again later.";
        alert(message);
    }
}