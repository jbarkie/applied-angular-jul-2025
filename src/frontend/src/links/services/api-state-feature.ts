import { signalStoreFeature, withState } from '@ngrx/signals';

type ApiState = {
  state: 'isLoading' | 'loading' | 'fetching' | 'idle';
};

export function withApiState() {
  return signalStoreFeature(
    withState<ApiState>({
      state: 'idle',
    }),
  );
}
