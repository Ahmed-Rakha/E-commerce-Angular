import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('access_token')) {
    return true;
  }
  alert("You don't have permission to view this page");
  return false;
};
