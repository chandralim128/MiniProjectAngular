import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { of, throwError } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

export interface AuthRequestData {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface User {
  email: string,
  name: string
}

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

export const AUTHENTICATED_USER = "authenticatedUser";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public parameter: number = 0;
  authenticated = false;
  name:string = "";

  constructor(private router: Router, private http: HttpClient) {}

  endPointURL: string = "https://miniproject-d3d61-default-rtdb.asia-southeast1.firebasedatabase.app/";
  accountUrl: string = this.endPointURL+'account.json';

  doSignUp(authData: AuthRequestData){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnjCkuK3ReK7cLYvqY_mxqGcWi5CbZkeM', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: authData.returnSecureToken
    });
  }

  insertToDb(user: User){
    this.http.post<{name: string}>(this.accountUrl, user, {
      observe: 'response',
      responseType: 'json'
    }).subscribe(
      (data) => {
        console.log(data);
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  doLogout() {
    this.authenticated = false;
    this.name = "";
  }

  doLogin(authData: AuthRequestData) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnjCkuK3ReK7cLYvqY_mxqGcWi5CbZkeM', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: authData.returnSecureToken
    });
  }

  isUserLoggedIn() {
    if(this.authenticated == false){
      return false;
    } else {
      return true;
    }
  }

  fetchAccount(){
    return this.http.get<{[key: string] : User}>(this.accountUrl,{
    })
    .pipe(
      map( responseData =>{
        const postArray: User[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key]})
          }
        }
        return postArray;
      })
    );
  }

}

export class ReturnJson {
  constructor(public status: string, public message: string) {}
}
