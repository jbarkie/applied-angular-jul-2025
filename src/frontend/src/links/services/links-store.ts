import {
  patchState,
  signalStore,
  withComputed,
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
import { computed, inject } from '@angular/core';
import {
  setIsFulfilled,
  setIsLoading,
  withApiState,
} from './api-state-feature';

type SortOptions = 'newest' | 'oldest';

type LinkState = {
  sortOrder: SortOptions;
  filterTag: string | null;
};

export const LinksStore = signalStore(
  withState<LinkState>({
    sortOrder: 'newest',
    filterTag: null,
  }),
  withApiState(),
  withEntities<ApiLink>(),
  withDevtools('LinksStore'),
  withMethods((state) => {
    const service = inject(LinksApiService);
    return {
      clearFilterTag: () => patchState(state, { filterTag: null }),
      setFilterTag: (tag: string) => patchState(state, { filterTag: tag }),
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(state, setIsLoading())),
          exhaustMap(() =>
            service
              .getLinks()
              .pipe(
                tap((r) => patchState(state, setEntities(r), setIsFulfilled())),
              ),
          ),
        ),
      ),
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder: sortOrder }),
    };
  }),
  withComputed((store) => {
    return {
      tags: computed(() => {
        const links = store.entities();
        const allTags = links.reduce((prev: string[], curr) => {
          return [...prev, ...curr.tags];
        }, []);
        return Array.from(new Set(allTags));
      }),
      filteredLinks: computed(() => {
        const tag = store.filterTag();
        const entities = store.entities();
        if (tag === null) return entities;
        return (entities || []).filter((link) => link.tags.includes(tag));
      }),
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
