import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../Services/apiServices/auth.service";
import { TokenStorage } from "../../shared/auth/token-storage";
import { AlertConfig } from "ngx-bootstrap/alert";
import { GlobleService } from "../../Services/globle.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    public route: Router,
    private authService: AuthService,
    private token: TokenStorage,
    private globalService: GlobleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  alerts: any = [];
  onSubmit(formData) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.authorLogin(username, password).subscribe(
      (data) => {
        this.route.navigate(["/", "dashboard"]);
        this.token.saveToken(data);
      },
      (error) => {
        if (error.error) {
          this.globalService.getErrorNotifyLogin(error.error.error);
        } else {
          this.globalService.getErrorNotifyLogin(
            "Somthing went wrong please try again"
          );
        }
      }
    );
  }
}
