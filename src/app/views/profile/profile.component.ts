import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobleService } from "../../Services/globle.service";
import { UserService } from "../../Services/apiServices/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private globalService: GlobleService,
    private formBuilder: FormBuilder
  ) {}

  updateUserForm: FormGroup;
  submitted = false;
  message: any;
  user: any;

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      contact_number: ["", [Validators.required]],
    });
    this.getUser();
  }

  get f() {
    return this.updateUserForm.controls;
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
        if (this.user.data) {
          this.updateUserForm.controls["id"].setValue(this.user.data.id);
          this.updateUserForm.controls["first_name"].setValue(
            this.user.data.first_name
          );
          this.updateUserForm.controls["last_name"].setValue(
            this.user.data.last_name
          );
          this.updateUserForm.controls["contact_number"].setValue(
            this.user.data.contact_number
          );
          this.updateUserForm.controls["email"].setValue(this.user.data.email);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateUserForm.invalid) {
      return;
    }
    this.userService
      .updateUser(this.updateUserForm.value, this.updateUserForm.value.id)
      .subscribe(
        (data) => {
          this.message = data;
          if (this.message.message) {
            this.globalService.getSuccessNotifyOptions(this.message.message);
            this.getUser();
          }
        },
        (error) => {
          this.globalService.getErrorNotifyLogin(
            "Somthing went wrong please try again"
          );
        }
      );
  }
}
