import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private authenticationService:AuthenticationService,private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        const currentUser = this.authenticationService.currentUser;
        console.log( currentUser);

        if(currentUser){
            console.log('User is logged in');
            return true;
        }
        this.router.navigate(['/auth']);
        return false;
    }
}