
export class RegisterUser{
    email: string;
    password: string;
    confirmPassword: string;
    constructor(email: string, password: string, confirmPassword: string){
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}

export class LoginUser{
    email: string;
    password: string;
    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}