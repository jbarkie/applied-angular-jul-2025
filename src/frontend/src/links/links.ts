import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinksStore } from './services/links-store';

@Component({
  selector: 'app-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [LinksStore],
  template: `
    <div class="flex flex-row gap-4">
      <a routerLink="/links" class="link">List</a>
      <a routerLink="prefs" class="link">Prefs</a>
    </div>

    <div class="p-4">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Links {}
