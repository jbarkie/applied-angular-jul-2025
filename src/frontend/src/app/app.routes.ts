import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { About } from './pages/about';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'demos',
    loadChildren: () => import('../demos/routes').then((r) => r.DEMOS_ROUTES),
  },
  {
    path: 'links',
    loadChildren: () =>
      import('../links/links.routes').then((r) => r.LINKS_ROUTES),
  },
];
