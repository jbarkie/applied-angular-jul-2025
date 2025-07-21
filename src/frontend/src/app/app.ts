import { Component } from '@angular/core';

import { WelcomeComponent } from './components/welcome.component';

@Component({
  selector: 'app-root',
  template: `
    <main class="container mx-auto">
      <app-welcome />
    </main>
  `,
  styles: [],
  imports: [WelcomeComponent],
})
export class App {}
