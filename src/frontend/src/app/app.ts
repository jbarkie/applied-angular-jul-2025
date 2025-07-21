import { Component } from '@angular/core';

import { NavBar } from './components/nav-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavBar, RouterOutlet],
})
export class App {}
