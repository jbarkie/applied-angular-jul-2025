import { Routes } from '@angular/router';
import { Links } from './links';
import { LinksList } from './pages/list';
import { Prefs } from './pages/prefs';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: Links,
    children: [
      {
        path: 'list',
        component: LinksList,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
    ],
  },
];
