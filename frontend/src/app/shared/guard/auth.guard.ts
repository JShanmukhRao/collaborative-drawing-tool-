import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy{

    currentUserSubscription!: Subscription;
    currentUser: any;
    constructor(private authenticationService:AuthenticationService,private router: Router){
        console.log('AuthGuard#ngOnInit constr');
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user) => {
            if (user) {
                this.currentUser = user;
            }
        });
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        console.log('AuthGuard#canActivate called');
        if(this.currentUser){
            console.log('User is logged in');
            return true;
        }
        this.router.navigate(['/auth']);
        return false;
    }
    ngOnDestroy(){
        this.currentUserSubscription.unsubscribe();
    }
}