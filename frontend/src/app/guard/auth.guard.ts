import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.isLoggedIn()) {
      return true; //Insert also role based authentication here isAdminOrUser()
    } else {
      router.navigate(['login']);
      return false;
    }

};
