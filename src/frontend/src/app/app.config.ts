import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IdentityFeature } from './shared/identity/store';
import { IdentityEffects } from './shared/identity/effects';
import { navBarFeature } from './shared/nav-bar/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
    ),
    provideHttpClient(withFetch()),
    provideStore(),
    provideStoreDevtools(),
    provideEffects([IdentityEffects]),
    provideState(IdentityFeature),
    provideState(navBarFeature),
  ],
};
