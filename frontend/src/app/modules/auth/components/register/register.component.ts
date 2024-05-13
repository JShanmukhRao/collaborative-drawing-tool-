import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  currentUserSubscription!: Subscription;


  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  register = () => {
    this.submitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }
    this.authenticationService.registerUser(this.registerForm.value).pipe(first()).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/auth']);
    });
  }
  ngOnInit(): void {
   
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
