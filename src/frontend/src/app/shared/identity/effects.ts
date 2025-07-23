import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IdentityActions } from './actions';
import { exhaustMap, map } from 'rxjs';
import { IdentityState } from './store';

export class IdentityEffects {
  #http = inject(HttpClient);
  #actions = inject(Actions);
  handleLogin$ = createEffect(() =>
    this.#actions.pipe(
      ofType(IdentityActions.loginRequested),
      exhaustMap(() =>
        this.#http
          .get<IdentityState>('https://identity.company.com/profile')
          .pipe(
            map((identity) =>
              IdentityActions.loginSucceeded({ payload: identity }),
            ),
          ),
      ),
    ),
  );
}
