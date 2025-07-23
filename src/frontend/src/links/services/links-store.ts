import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { ApiLink } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { LinksApiService } from './links-api';
import { exhaustMap, pipe, tap } from 'rxjs';
import { inject } from '@angular/core';
import { withApiState } from './api-state-feature';

type SortOptions = 'newest' | 'oldest';

type LinkState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withState<LinkState>({
    sortOrder: 'newest',
  }),
  withApiState(),
  withEntities<ApiLink>(),
  withDevtools('LinksStore'),
  withMethods((state) => {
    const service = inject(LinksApiService);
    return {
      load: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            service
              .getLinks()
              .pipe(tap((r) => patchState(state, setEntities(r)))),
          ),
        ),
      ),
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder: sortOrder }),
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
      console.log('Links Store created.');
    },
    onDestroy() {
      console.log('Links Store destroyed');
    },
  }),
);
