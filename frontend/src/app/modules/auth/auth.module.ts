import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
    imports: [AuthRoutingModule,
        SharedModule],
    declarations: [LoginComponent,RegisterComponent],
    exports: []
})
export class AuthModule {}