import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>About page here</p> `,
  styles: ``,
})
export class About {}
