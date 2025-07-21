import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-demos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex flex-row gap-4">
      <a routerLink="signals" class="btn btn-primary">Signals</a>
    </div>
    <section class="p-8">
      <router-outlet />
    </section>
  `,
  styles: ``,
})
export class Demos {}
