import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

type CounterState = {
  currentCount: number;
  countBy: number;
};

export const CounterStore = signalStore(
  withState<CounterState>({ currentCount: 0, countBy: 1 }),
  withComputed((store) => {
    return {
      disableDecrement: computed(
        () => store.currentCount() - store.countBy() <= 0,
      ),
    };
  }),
  withMethods((state) => {
    return {
      increment: (currentCount: number) =>
        patchState(state, { currentCount: currentCount + state.countBy() }),
      decrement: (currentCount: number) =>
        patchState(state, { currentCount: currentCount - state.countBy() }),
      changeCountBy: (countBy: number) =>
        patchState(state, { countBy: countBy }),
      fizzBuzz: (currentCount: number) => {
        if (currentCount === 0) return null;
        else if (currentCount % 3 === 0 && currentCount % 5 === 0)
          return 'FizzBuzz';
        else if (currentCount % 3 === 0) return 'Fizz';
        else if (currentCount % 5 === 0) return 'Buzz';
        else return null;
      },
    };
  }),
);
