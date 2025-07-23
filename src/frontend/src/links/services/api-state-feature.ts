import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type ApiLoadingStates = 'isLoading' | 'loading' | 'fetching' | 'idle';

type ApiState = {
  state: ApiLoadingStates;
};

export function withApiState() {
  return signalStoreFeature(
    withState<ApiState>({
      state: 'idle',
    }),
    withComputed((store) => {
      return {
        isLoading: computed(() => store.state() === 'isLoading'),
        isFetching: computed(() => store.state() === 'fetching'),
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

export function setFetching(): ApiState {
  return { state: 'fetching' };
}
