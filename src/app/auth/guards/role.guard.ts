import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];

  const user = authService.user;

  if (!user || !expectedRoles.includes(user.rol)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
