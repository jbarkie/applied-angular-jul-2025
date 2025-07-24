import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../identity/store';

export const isLoggedInGuard: CanActivateFn = () => {
  const reduxStore = inject(Store);
  const isLoggedIn = reduxStore.selectSignal(selectIsLoggedIn);
  return isLoggedIn();
};
