import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-links-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Editing a link with id of {{ id() }}</p> `,
  styles: ``,
})
export class Edit {
  id = input<string>();
}
