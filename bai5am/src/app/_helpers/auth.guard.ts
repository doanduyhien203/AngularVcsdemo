import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserLoginService } from '../_service/userlogin.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: UserLoginService
    ) {}

    canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        
        if (this.loginService.userValue || this.loginService.isLoggedIn ) {
            // authorised so return true
            return true;
        }

       
        this.router.navigate(['/login']);
        return false;
        
    }
    
}