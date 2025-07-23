import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinksStore } from './services/links-store';
import { LinksApiService } from './services/links-api';

@Component({
  selector: 'app-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [LinksStore, LinksApiService],
  template: `
    <div class="flex flex-row gap-4">
      <a routerLink="list" class="link">List</a>
      <a routerLink="prefs" class="link">Prefs</a>
    </div>

    <div class="p-4">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Links {}
