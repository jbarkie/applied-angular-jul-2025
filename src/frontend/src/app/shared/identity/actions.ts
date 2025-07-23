import { createActionGroup, emptyProps } from '@ngrx/store';

export const IdentityActions = createActionGroup({
  source: 'identity',
  events: {
    'Login Requested': emptyProps(),
  },
});
