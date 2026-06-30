import { Component, input } from '@angular/core';

@Component({
  selector: 'app-placeholder-page',
  templateUrl: './placeholder-page.component.html',
  styleUrl: './placeholder-page.component.scss',
})
export class PlaceholderPageComponent {
  readonly title = input('Coming soon');
}
