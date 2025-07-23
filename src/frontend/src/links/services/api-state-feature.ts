import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

type ApiState = {
  state: 'isLoading' | 'loading' | 'fetching' | 'idle';
};

export function withApiState() {
  return signalStoreFeature(
    withState<ApiState>({
      state: 'idle',
    }),
    withComputed((store) => {
      return {
        isLoading: computed(() => store.state() === 'isLoading'),
      };
    }),
  );
}

export function setIsLoading(): ApiState {
  return { state: 'isLoading' };
}

export function setIsFulfilled(): ApiState {
  return { state: 'idle' };
}
