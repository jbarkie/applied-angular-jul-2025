import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Change counter to count by:</p>
    <div class="flex flex-row gap-4">
      @for (option of countByOptions; track $index) {
        <button (click)="store.changeCountBy(option)" class="btn btn-secondary">
          {{ option }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class CounterPrefs {
  countByOptions = [1, 3, 5];
  store = inject(CounterStore);
}
