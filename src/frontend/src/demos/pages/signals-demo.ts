import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-demos-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="max-w-48 mx-auto">
      <p>Your score: {{ score() }}</p>
      <div class="grid gap-4 mx-auto">
        <button (click)="takeAStroke()" class="btn btn-sm btn-secondary mt-4">
          Take a stroke
        </button>

        @if (underPar()) {
          <div class="badge badge-success">You're under par</div>
        } @else {
          <div class="badge badge-error">You're over par</div>
        }

        <button
          class="btn btn-info"
          (click)="score.set(0)"
          [disabled]="score() === 0"
        >
          Reset
        </button>
        <p>tick {{ tick() }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class SignalsDemo {
  score = signal(0);
  par = signal(4);
  tick = signal(0);
  underPar = computed(() => this.score() <= this.par());
  takeAStroke() {
    this.score.update((s) => s + 1);
  }

  constructor() {
    effect((onCleanup) => {
      const currentScore = this.score();
      const intervalId = setInterval(
        () => this.tick.update((t) => t + 1),
        1000,
      );
      if (currentScore > 8) {
        console.log('yikes');
      }
      onCleanup(() => clearInterval(intervalId));
    });
  }
}
