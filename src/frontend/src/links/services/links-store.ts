import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { ApiLink } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type SortOptions = 'newest' | 'oldest';

type LinkState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withState<LinkState>({
    sortOrder: 'newest',
  }),
  withEntities<ApiLink>(),
  withDevtools('LinksStore'),
  withMethods((state) => {
    return {
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder: sortOrder }),
    };
  }),
);
