import { effect, inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { NavbarLinksActions } from '../../app/shared/nav-bar/actions/links';
import { TagPrefsState } from '../../app/shared/nav-bar/store';

type UserPrefsState = {
  watchedTags: string[];
  ignoredTags: string[];
};

const initialState: UserPrefsState = {
  watchedTags: [],
  ignoredTags: [],
};

export function withUserPrefs() {
  return signalStoreFeature(
    withState<UserPrefsState>(initialState),
    withMethods((store) => {
      const reduxStore = inject(Store);
      return {
        addToWatched: (tag: string) => {
          patchState(store, { watchedTags: [tag, ...store.watchedTags()] });
          if (store.ignoredTags().includes(tag)) {
            patchState(store, {
              ignoredTags: store.ignoredTags().filter((t) => tag !== t),
            });
          }
        },
        removeFromWatched: (tag: string) => {
          patchState(store, {
            watchedTags: store.watchedTags().filter((t) => t !== tag),
          });
        },
        addToIgnored: (tag: string) => {
          patchState(store, { ignoredTags: [tag, ...store.ignoredTags()] });
          if (store.watchedTags().includes(tag)) {
            patchState(store, {
              watchedTags: store.watchedTags().filter((t) => tag !== t),
            });
          }
        },
        removeFromIgnored: (tag: string) => {
          patchState(store, {
            ignoredTags: store.ignoredTags().filter((t) => t !== tag),
          });
        },
        _tellTheNavbar: () => {
          const payload = {
            numberOfWatchedTags: store.watchedTags().length,
            numberOfIgnoredTags: store.ignoredTags().length,
          } as TagPrefsState;
          reduxStore.dispatch(NavbarLinksActions.tagPrefsChanged({ payload }));
        },
      };
    }),
    withHooks({
      onInit(store) {
        effect(() => {
          store._tellTheNavbar();
        });
      },
    }),
  );
}
