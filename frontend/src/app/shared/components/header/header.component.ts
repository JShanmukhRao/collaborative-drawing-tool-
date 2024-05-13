import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy{
  currentUser: any;
  currentUserSubscription!: Subscription;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) { 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user: any) => {
      console.log('HeaderComponent#ngOnInit', user);
      this.currentUser = user;
    });
    }

  
  showActionBox: boolean = false;
  redirectHome() {
    this.router.navigate(['/']);
  }

  logout(){
    this.authenticationService.logout();
  }

  toggleActionBox(){
    this.showActionBox = !this.showActionBox;
  }

  ngOnInit(){
   
  }
  ngOnDestroy(){
    this.currentUserSubscription.unsubscribe();
  }
}
