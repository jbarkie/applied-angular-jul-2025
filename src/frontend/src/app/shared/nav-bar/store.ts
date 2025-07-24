import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { NavbarLinksActions } from './actions/links';

export type TagPrefsState = {
  numberOfWatchedTags: number;
  numberOfIgnoredTags: number;
};

type NavBarState = {} & TagPrefsState;

const initialState: NavBarState = {
  numberOfWatchedTags: 0,
  numberOfIgnoredTags: 0,
};

export const navBarFeature = createFeature({
  name: 'app nav-bar',
  reducer: createReducer(
    initialState,
    on(NavbarLinksActions.tagPrefsChanged, (state, { payload }) => ({
      ...state,
      ...payload,
    })),
  ),
  extraSelectors: ({
    selectNumberOfIgnoredTags,
    selectNumberOfWatchedTags,
  }) => ({
    selectLinksNavbar: createSelector(
      selectNumberOfIgnoredTags,
      selectNumberOfWatchedTags,
      (ignored, watched) => ({
        numberOfIgnoredTags: ignored,
        numberOfWatchedTags: watched,
      }),
    ),
  }),
});

export const { selectLinksNavbar } = navBarFeature;
