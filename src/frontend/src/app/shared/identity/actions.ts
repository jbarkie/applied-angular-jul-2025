import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IdentityState } from './store';

export const IdentityActions = createActionGroup({
  source: 'identity',
  events: {
    'Login Requested': emptyProps(),
    'Login Succeeded': props<{ payload: IdentityState }>(),
    'Logout Requested': emptyProps(),
  },
});
