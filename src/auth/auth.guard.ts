import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { RegisterService } from 'src/services/register.service';

export const AuthGuard = () => {
  const router = inject(Router);
  const auth = inject(LoginService);
  const registerStatus = inject(RegisterService);

  // check if any of these methods returns false. If false user is not logged in or registered.
  if (!auth.getUserLogedInStatus() && !registerStatus.isUserRegistered()) {
    return router.navigateByUrl('');
  }
  return true;
};
