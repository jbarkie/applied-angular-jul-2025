import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

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
      };
    }),
  );
}
