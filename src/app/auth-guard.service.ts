import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  menuAuth: any = null;
  constructor(
    private router: Router,
    private authServ: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.menuAuth = null;

    if (this.authServ.isUserLoggedIn()){
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
