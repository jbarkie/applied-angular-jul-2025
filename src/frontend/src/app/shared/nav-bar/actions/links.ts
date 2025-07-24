import { createActionGroup, props } from '@ngrx/store';
import { TagPrefsState } from '../store';

export const NavbarLinksActions = createActionGroup({
  source: 'Navbar Links',
  events: {
    'Tag Prefs Changed': props<{ payload: TagPrefsState }>(),
  },
});
