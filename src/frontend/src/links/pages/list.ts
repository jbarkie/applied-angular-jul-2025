import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LinksStore } from '../services/links-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <p>List goes here</p>

    @if (store.isLoading()) {
      <div class="loading-ball loading"></div>
    } @else {
      <form class="filter">
        <input
          (click)="store.clearFilterTag()"
          type="reset"
          value="x"
          class="btn btn-square"
        />
        @for (tag of store.tags(); track tag) {
          <input
            (click)="store.setFilterTag(tag)"
            type="radio"
            name="filter"
            class="btn"
            [checked]="store.filterTag() === tag"
            [attr.aria-label]="tag"
          />
        }
      </form>
    }
    @if (store.isFetching()) {
      <progress class="progress w-full"></progress>
    }
    <ul class="list rounded-box bg-base-300">
      @for (link of store.filteredLinks(); track link.id) {
        <li class="list-row mb-2">
          <div>
            <p class="text-md font-bold">{{ link.title }}</p>
            <a class="link" [href]="link.url" target="_blank">{{ link.url }}</a>
          </div>
          <div>
            @if (link.isOwnedByCurrentUser) {
              <a
                [routerLink]="['..', link.id, 'edit']"
                class="btn btn-sm btn-accent"
                >Edit link</a
              >
            }
          </div>
          <div>
            @for (tag of link.tags; track tag) {
              <button
                (click)="store.setFilterTag(tag)"
                class="badge badge-primary mr-2"
              >
                {{ tag }}
              </button>
            }
          </div>
        </li>
      } @empty {
        <p>Sorry, no links. Add some!</p>
      }
    </ul>
    <p class="mt-2">You are sorting by: {{ store.sortOrder() }}</p>
  `,
  styles: ``,
})
export class LinksList {
  store = inject(LinksStore);
}
