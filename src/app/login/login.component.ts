import { Component, OnInit } from '@angular/core';
import { AuthRequestData, AuthenticationService, User } from '../authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  retUrl:string="";
  loginForm: FormGroup;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  onSubmit(){
    if(!this.loginForm.valid) {
      swal.fire({
        title: "Error!",
        text: "Check Your Data",
        showConfirmButton: true,
        icon: "error",
      });
      return;
    }

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    const authReqData: AuthRequestData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    if(this.authServ.authenticated){

    } else {
      this.authServ.doLogin(authReqData).subscribe(
        resdata => {
          this.authServ.authenticated = true;
          this.router.navigate([""]);
          this.authServ.fetchAccount().subscribe(
            (data) => {
              data.forEach(element => {
                if(element.email === email){
                  this.authServ.email = element.email;
                  swal.fire({
                    title: "Welcome!",
                    text: element.name,
                    showConfirmButton: true,
                    icon: "success",
                  });
                }
              });
            }
          )
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
              errorMessage = "Password is invalid";
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
    this.loginForm.reset();
  }

  goToSignUp(){
    this.router.navigate(["/signUp"]);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl({ value: null}, [Validators.required]),
      password: new FormControl({ value: null}, [Validators.required]),
    });
  }

}
