import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { LinksStore } from '../services/links-store';
import { UserTagFilter } from '../components/user-tag-filter';

@Component({
  selector: 'app-links-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserTagFilter],
  template: `
    <div>
      <p>Link sorting preferences</p>
      <div class="join">
        <button
          [disabled]="store.sortOrder() === 'newest'"
          (click)="store.changeSortOrder('newest')"
          class="btn join-item"
        >
          Newest at top
        </button>
        <button
          [disabled]="store.sortOrder() === 'oldest'"
          (click)="store.changeSortOrder('oldest')"
          class="btn join-item"
        >
          Oldest at top
        </button>
      </div>
    </div>
    <app-links-user-tag-filter />
  `,
  styles: ``,
})
export class Prefs {
  linkSortOrder = signal<'newest' | 'oldest'>('newest');

  store = inject(LinksStore);
}
