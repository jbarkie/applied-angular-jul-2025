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
  setFetching,
  setIsFulfilled,
  setIsLoading,
  withApiState,
} from './api-state-feature';
import {
  clearFilteringTag,
  setFilterTag,
  withLinkFiltering,
} from './link-filter-feature';

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
  withLinkFiltering(),
  withMethods((state) => {
    const service = inject(LinksApiService);
    return {
      clearFilterTag: () => patchState(state, clearFilteringTag()),
      setFilterTag: (tag: string) => patchState(state, setFilterTag(tag)),
      load: rxMethod<{ isBackgroundFetch: boolean }>(
        pipe(
          tap((p) =>
            patchState(
              state,
              p.isBackgroundFetch ? setFetching() : setIsLoading(),
            ),
          ),
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
      store.load({ isBackgroundFetch: false });
      console.log('Links Store created.');
      setInterval(() => {
        store.load({ isBackgroundFetch: true });
      }, 5000);
    },
    onDestroy() {
      console.log('Links Store destroyed');
    },
  }),
);
