import { ActivatedRouteSnapshot, CanActivateFn, Routes } from '@angular/router';
import { Links } from './links';
import { LinksList } from './pages/list';
import { Prefs } from './pages/prefs';
import { Edit } from './pages/edit';
import { isLoggedInGuard } from '../app/shared/routing/logged-in-guard';
import { LinksStore } from './services/links-store';
import { inject } from '@angular/core';
import { selectSub } from '../app/shared/identity/store';
import { Store } from '@ngrx/store';
import { LinksApiService } from './services/links-api';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: Links,
    providers: [LinksStore, LinksApiService],
    children: [
      {
        path: 'list',
        component: LinksList,
      },
      {
        path: 'prefs',
        component: Prefs,
        canActivate: [isLoggedInGuard],
      },
      {
        path: ':id/edit',
        component: Edit,
        canActivate: [isLoggedInGuard, isOwnerOfLinkGuard],
      },
    ],
  },
];

function isOwnerOfLinkGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const store = inject(LinksStore);
    const userSub = inject(Store).selectSignal(selectSub);
    const linkId = route.paramMap.get('id');
    if (linkId === null || userSub() === null) {
      return false;
    }
    const link = store.entityMap()[linkId];
    if (!link) {
      return false;
    }
    return link.owner === userSub();
  };
}
