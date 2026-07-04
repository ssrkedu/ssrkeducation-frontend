import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AnnouncementTickerItem } from './announcement-ticker.types';

@Component({
  selector: 'app-announcement-ticker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './announcement-ticker.component.html',
  styleUrl: './announcement-ticker.component.css',
})
export class AnnouncementTickerComponent {
  readonly items = input.required<AnnouncementTickerItem[]>();
  readonly label = input('LATEST');
  readonly ariaLabel = input('Latest announcements');

  // Duplicate the list so the marquee loop has no visible gap.
  protected readonly loopItems = computed(() => {
    const list = this.items();
    return list.length > 0 ? [...list, ...list] : [];
  });
}
