/*==============================
; Title: Auth Guard
; Date: 18 August 2021
; Author: George Henderson
; Description: Checks user cookies to see if they have an open session.
==============================*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inject Router & CookieService
  constructor(private router: Router, private cookieService: CookieService) { }

/**
 * Checks user cookies to find 'session_user'
 * @param route
 * @param state
 */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const sessionUser = this.cookieService.get('session_user');

    if(sessionUser) {
      return true;
    }
    else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }

}
