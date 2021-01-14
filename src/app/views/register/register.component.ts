import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../Services/apiServices/auth.service";
import { GlobleService } from "../../Services/globle.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html",
})
export class RegisterComponent implements OnInit {
  message: any;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public route: Router,
    private globalService: GlobleService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      contact_number: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.authorRegister(this.registerForm.value).subscribe(
      (data) => {
        this.message = data;
        this.route.navigate(["/", "login"]);
        this.globalService.getSuccessNotifyOptions(this.message.message);
      },
      (error) => {
        if (error.error) {
          this.globalService.getErrorNotifyLogin(error.error.message);
        } else {
          this.globalService.getErrorNotifyLogin(
            "Somthing went wrong please try again"
          );
        }
      }
    );
  }
}
