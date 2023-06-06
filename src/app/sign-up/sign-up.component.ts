import { Component, OnInit } from '@angular/core';
import { AuthRequestData, AuthenticationService, User } from '../authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      name: new FormControl({ value: null}, [Validators.required]),
      email: new FormControl({ value: null}, [Validators.required]),
      confpassword: new FormControl({ value: null}, [Validators.required]),
      password: new FormControl({ value: null}, [Validators.required]),
    });
  }

  onSubmit(){
    if(!this.userForm.valid) {
      swal.fire({
        title: "Error!",
        text: "Check Your Data",
        showConfirmButton: true,
        icon: "error",
      });
      return;
    }

    const email = this.userForm.get('email').value;
    const password = this.userForm.get('password').value;
    const name = this.userForm.get('name').value;
    const confpassword = this.userForm.get('confpassword').value;

    if(confpassword != password) {
      swal.fire({
        title: "Error!",
        text: "Password didn't Match",
        showConfirmButton: true,
        icon: "error",
      });
      return;
    }

    const authReqData: AuthRequestData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    const userData: User = {
      email: email,
      name: name
    }

    if(this.authServ.authenticated){

    } else {
      this.authServ.doSignUp(authReqData).subscribe(
        resdata => {
          console.log(resdata);
          this.authServ.authenticated = true;
          this.authServ.name = name;
          this.authServ.insertToDb(userData);
          this.router.navigate([""]);
          swal.fire({
            title: "Welcome!",
            text: name,
            showConfirmButton: true,
            icon: "success",
          });
        }, error => {
          let errorMessage = "";
          switch(error.error.error.message){
            case 'EMAIL_EXISTS':
              errorMessage = "This email is already exist";
              break;
            case 'OPERATION_NOT_ALLOWED':
              errorMessage = "Password sign-in is disabled for this project";
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage = "We have blocked all requests due to unusual activity. Try again later";
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = "There is no user record";
              break;
            case 'INVALID_PASSWORD':
              errorMessage = "The password is invalid";
              break;
            case 'USER_DISABLED':
              errorMessage = "The user account has been disabled by an administrator.";
              break;
          }
          swal.fire({
            title: "Error!",
            text: errorMessage,
            showConfirmButton: true,
            icon: "error",
          });
        }
      )
    }
    this.userForm.reset();
  }

  goToLogin(){
    this.router.navigate(["/login"]);
  }

}
