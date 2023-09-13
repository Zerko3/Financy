import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

export const AuthGuard = () => {
  const router = inject(Router);
  const auth = inject(LoginService);
  if (!auth.getUserLogedInStatus()) {
    return router.navigateByUrl('/login');
  }
  return true;
};
