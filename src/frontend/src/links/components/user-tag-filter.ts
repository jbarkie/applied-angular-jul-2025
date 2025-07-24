import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
              <div tabindex="0" role="button" class="btn m-1">
                {{ tag }}

                @if (store.watchedTags().includes(tag)) {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 15 15"
                  >
                    <!-- Icon from Teenyicons by smhmd - https://github.com/teenyicons/teenyicons/blob/master/LICENSE -->
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7.5 7.686V9a1.5 1.5 0 0 1 0-3zM7.5 5a2.5 2.5 0 0 0 0 5v3c-2.686 0-4.561-1.348-5.747-2.665a10.4 10.4 0 0 1-1.61-2.407a6 6 0 0 1-.099-.222l-.006-.014l-.001-.004l-.001-.002L.5 7.5l-.464.186a.5.5 0 0 1 0-.372l.066.027l-.066-.028v-.001l.002-.004l.006-.014a4 4 0 0 1 .1-.222a10.4 10.4 0 0 1 1.61-2.406C2.938 3.348 4.813 2 7.5 2zm0 1v3a1.5 1.5 0 1 0 0-3m0 4a2.5 2.5 0 0 0 0-5V2c2.686 0 4.561 1.348 5.747 2.666a10.4 10.4 0 0 1 1.61 2.406a6 6 0 0 1 .099.222l.005.014l.002.004l.001.002l-.364.146l.364-.146a.5.5 0 0 1 0 .372L14.5 7.5l.464.187v.001l-.003.004l-.005.014a3 3 0 0 1-.1.222a10.4 10.4 0 0 1-1.61 2.406C12.062 11.653 10.187 13 7.5 13z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
                @if (store.ignoredTags().includes(tag)) {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 15 15"
                  >
                    <!-- Icon from Teenyicons by smhmd - https://github.com/teenyicons/teenyicons/blob/master/LICENSE -->
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0m10.147 3.354L7.5 8.207l-2.646 2.647l-.708-.707L6.793 7.5L4.146 4.854l.708-.708L7.5 6.793l2.646-2.647l.708.708L8.207 7.5l2.647 2.646z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                @if (store.watchedTags().includes(tag) === false) {
                  <li>
                    <button (click)="store.addToWatched(tag)">
                      Watched Tags
                    </button>
                  </li>
                }
                @if (store.ignoredTags().includes(tag) === false) {
                  <li>
                    <button (click)="store.addToIgnored(tag)">
                      Ignored Tags
                    </button>
                  </li>
                }
              </ul>
            </li>
          } @empty {
            <p>No available tags</p>
          }
        </ul>
      </div>
      <div class="w-2/3">
        <p>Watched Tags</p>
        @for (tag of store.watchedTags(); track tag) {
          <li class="dropdown dropdown-center">
            <div tabindex="0" role="button" class="btn m-1">{{ tag }}</div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button (click)="store.removeFromWatched(tag)">
                  Remove From Watched
                </button>
              </li>
            </ul>
          </li>
        } @empty {
          <p>No available tags</p>
        }
      </div>
      <div class="w-1/3">
        <p>Ignored Tags</p>
        @for (tag of store.ignoredTags(); track tag) {
          <li class="dropdown dropdown-center">
            <div tabindex="0" role="button" class="btn m-1">{{ tag }}</div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button (click)="store.removeFromIgnored(tag)">
                  Remove From Ignored
                </button>
              </li>
            </ul>
          </li>
        } @empty {
          <p>No available tags</p>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class UserTagFilter {
  store = inject(LinksStore);
}
