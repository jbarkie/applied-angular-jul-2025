import { createFeature, createReducer, on } from '@ngrx/store';
import { IdentityActions } from './actions';

export type IdentityState = {
  sub: string | null;
  roles: string[];
};

const initialState: IdentityState = {
  sub: null,
  roles: [],
};

export const IdentityFeature = createFeature({
  name: 'identity',
  reducer: createReducer(
    initialState,
    on(IdentityActions.loginSucceeded, (state, { payload }) => payload),
  ),
});
