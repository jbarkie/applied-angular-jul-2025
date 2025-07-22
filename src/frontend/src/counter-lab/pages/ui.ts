import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.disableDecrement()"
        (click)="store.decrement(store.currentCount())"
        class="btn btn-primary"
      >
        -
      </button>
      <span>{{ store.currentCount() }}</span>
      <button
        (click)="store.increment(store.currentCount())"
        class="btn btn-primary"
      >
        +
      </button>
      @if (isFizzBuzzing()) {
        <p class="mt-2">{{ store.fizzBuzz(store.currentCount()) }}</p>
      }
    </div>
  `,
  styles: ``,
})
export class Ui {
  store = inject(CounterStore);
  isFizzBuzzing = computed(
    () => this.store.fizzBuzz(this.store.currentCount()) !== null,
  );
}
