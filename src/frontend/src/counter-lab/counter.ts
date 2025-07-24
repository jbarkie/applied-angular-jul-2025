import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterStore } from './services/counter.store';
import { FeatureNav } from '../app/shared/components/feature-nav';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet, FeatureNav],
  providers: [CounterStore],
  template: ` <div class="flex flex-row gap-4">
      <app-feature-nav
        [links]="links()"
        sectionName="Counter Lab"
        omitRouterOutlet
      >
        <p>Your counter is {{ store.currentCount() }}</p>
      </app-feature-nav>
      <a routerLink="counter-prefs" class="link">Counter Prefs</a>
    </div>
    <router-outlet />`,
  styles: ``,
})
export class Counter {
  store = inject(CounterStore);
  links = signal([
    { label: 'UI', href: ['ui'] },
    { label: 'Prefs', href: ['prefs'] },
  ]);
}
