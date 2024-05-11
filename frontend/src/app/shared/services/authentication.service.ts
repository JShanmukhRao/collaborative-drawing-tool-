import { Injectable } from "@angular/core";
import { LoginUser, RegisterUser } from "../dto/auth.dto";
import { environment } from "src/environment/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{

    // private currentUserSubject: BehaviorSubject<any>;
    constructor(private http: HttpClient){
        // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    }

    public get currentUser(){
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            return JSON.parse(currentUser);
        }
    }

    registerUser(registerUser: RegisterUser){
        const url = environment.apiUrl + '/auth/register';
        const result = this.http.post(url, registerUser);
        return result; 
    }

    updateUserInLocalStorage(user: any){
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    loginUser(loginUser: LoginUser){
        const url = environment.apiUrl + '/auth/login';
        return this.http.post(url, loginUser)
            .pipe(map((userData:any) => {
                console.log("userData", userData)
                // decode the token to read the username and expiration timestamp
                const tokenParts = userData?.data.token.split(/\./);
                const userTokenData = JSON.parse(window.atob(tokenParts[1]));
                // assigning user values
                const user = {
                    id: userTokenData.id,
                    email: userTokenData.email,
                    firstName: userTokenData.firstName,
                    lastName: userTokenData.lastName,
                    healthcare: userTokenData.healthcare,
                    token: userData.token,
                };

                this.updateUserInLocalStorage(user);
                return user;
            }));
    }
}