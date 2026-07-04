export interface AnnouncementTickerItem {
  id: string;
  text: string;
  href?: string;
}

export interface AnnouncementTickerConfig {
  items: AnnouncementTickerItem[];
  label?: string;
  ariaLabel?: string;
}
