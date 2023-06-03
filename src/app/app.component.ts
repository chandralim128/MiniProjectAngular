import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MiniProject';

  constructor(public authServ: AuthenticationService, private router: Router) {}

  logOut(){
    this.authServ.authenticated = false;
    this.router.navigate(["/login"]);
  }
}
