import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { ModalComponent } from './shared/ui/modal/modal.component';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, RouterOutlet, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
