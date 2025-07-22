import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterStore } from './services/counter.store';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  providers: [CounterStore],
  template: ` <div class="flex flex-row gap-4">
      <a routerLink="ui" class="link">UI</a>
      <a routerLink="counter-prefs" class="link">Counter Prefs</a>
    </div>
    <router-outlet />`,
  styles: ``,
})
export class Counter {}
