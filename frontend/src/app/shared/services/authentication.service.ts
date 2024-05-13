import { Injectable, OnInit } from "@angular/core";
import { LoginUser, RegisterUser } from "../dto/auth.dto";
import { environment } from "src/environment/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnInit{

    private currentUserSubject: BehaviorSubject<any>= new BehaviorSubject<any>(null);
    constructor(private http: HttpClient,private router: Router){
        
    }

    public get currentUser(){
        const user = localStorage.getItem('currentUser');
        if(user)
        this.currentUserSubject.next(JSON.parse(user));
        return this.currentUserSubject.asObservable();
        
    }

    registerUser(registerUser: RegisterUser){
        const url = environment.apiUrl + '/auth/register';
        const result = this.http.post(url, registerUser);
        return result; 
    }

    updateUserInLocalStorage(user: any){
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log("user", user);
        this.currentUserSubject.next(user);
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
                    name: userTokenData.name,
                    email: userTokenData.email,
                    token: userData?.data.token,
                };

                this.updateUserInLocalStorage(user);
                return user;
            }));
    }

    logout(){
        this.updateUserInLocalStorage(null);
        this.router.navigate(['/auth']);
    }

    ngOnInit(): void {
        const user = localStorage.getItem('currentUser');
        console.log("AuthenticationService#ngOnInit", user)
        if (user) {
            this.currentUserSubject.next(JSON.parse(user));
        }
    }
}