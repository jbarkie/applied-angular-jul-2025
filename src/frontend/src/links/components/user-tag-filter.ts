import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LinksStore } from '../services/links-store';

@Component({
  selector: 'app-links-user-tag-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="flex flex-row gap-4">
      <div class="w-1/3">
        <p>Available Tags</p>
        <ul class="list rounded-box bg-base-300">
          @for (tag of store.tags(); track tag) {
            <li class="dropdown dropdown-center">
              <div tabindex="0" role="button" class="btn m-1">{{ tag }}</div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li><a>Watched Tags</a></li>
                <li><a>Ignored Tags</a></li>
              </ul>
            </li>
          } @empty {
            <p>No available tags</p>
          }
        </ul>
      </div>
      <div class="w-2/3">
        <p>Watched Tags</p>
      </div>
      <div class="w-1/3">
        <p>Ignored Tags</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class UserTagFilter {
  store = inject(LinksStore);
}
