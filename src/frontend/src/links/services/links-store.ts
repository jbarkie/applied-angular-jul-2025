import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type SortOptions = 'newest' | 'oldest';

type LinkState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withState<LinkState>({
    sortOrder: 'newest',
  }),
  withMethods((state) => {
    return {
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder: sortOrder }),
    };
  }),
);
