import { createFeature, createReducer } from '@ngrx/store';

type IdentityState = {
  sub: string | null;
  roles: string[];
};

const initialState: IdentityState = {
  sub: null,
  roles: [],
};

export const IdentityFeature = createFeature({
  name: 'identity',
  reducer: createReducer(initialState),
});
