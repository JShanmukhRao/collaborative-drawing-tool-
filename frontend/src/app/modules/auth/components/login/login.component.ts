import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  currentUserSubscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {    

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login = () => {
    console.log(this.loginForm.value);
    this.authenticationService.loginUser(this.loginForm.value).pipe(first()).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
    });

  }

  getRegisterLink() {
    return [this.router.url, 'register'];
  }
  ngOnInit(): void {
  
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}