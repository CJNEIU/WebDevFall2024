import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject, Inject } from '@angular/core';

export const authGuard = () => {
  const authService = inject(AuthService); // inject AuthService
  const router = inject(Router); // inject router for navigation

  const isAuthenticated = authService.getIsAuth();

  if(!isAuthenticated){
    router.navigate(["/"]);
  }

  return isAuthenticated;
};
