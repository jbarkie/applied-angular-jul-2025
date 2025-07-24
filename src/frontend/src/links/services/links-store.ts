import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { exhaustMap, interval, pipe, tap } from 'rxjs';
import { selectSub } from '../../app/shared/identity/store';
import { ApiLink } from '../types';
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
import { LinksApiService } from './links-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { withUserPrefs } from './user-prefs-feature';

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
  withUserPrefs(),
  withMethods((state) => {
    const service = inject(LinksApiService);
    return {
      clearFilterTag: () => patchState(state, clearFilteringTag()),
      setFilterTag: (tag: string) => patchState(state, setFilterTag(tag)),
      _load: rxMethod<{ isBackgroundFetch: boolean }>(
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
    const reduxStore = inject(Store);
    const userSub = reduxStore.selectSignal(selectSub);
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
        const sub = userSub();
        if (tag === null) {
          return store
            .entities()
            .map((l) => ({ ...l, isOwnedByCurrentUser: sub === l.owner }));
        }
        const filtered = store
          .entities()
          .filter((link) => link.tags.includes(tag || ''))
          .map((l) => ({
            ...l,
            isOwnedByCurrentUser: sub === l.owner,
          }));
        return filtered;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load({ isBackgroundFetch: false });
      console.log('Links Store created.');
      interval(5000)
        .pipe(takeUntilDestroyed())
        .subscribe(() => store._load({ isBackgroundFetch: true }));
    },
    onDestroy() {
      console.log('Links Store destroyed');
    },
  }),
);
