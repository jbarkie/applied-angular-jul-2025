import { Routes } from '@angular/router';
import { Demos } from './demos';
export const DEMOS_ROUTES: Routes = [
  {
    path: '',
    component: Demos,
    children: [
      {
        path: 'signals',
        loadComponent: () =>
          import('./pages/signals-demo').then((c) => c.SignalsDemo),
      },
    ],
  },
];
