import { UserService } from 'src/app/service/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = window.localStorage.getItem('token') as string;

      const result = this.userService.isLogged(token);

      result.subscribe({
        next: (result) => {
          if(result.isLogged === true) {
            return true;
          } else {
            this.router.navigate(['/login'])
            return false;
          }
        }, error: () => {
          this.router.navigate(['/login'])
          return false;
        }
      })
    return true;
  }

}
