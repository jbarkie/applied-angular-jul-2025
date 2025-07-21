import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Home Page</p> `,
  styles: ``,
})
export class Home {}
