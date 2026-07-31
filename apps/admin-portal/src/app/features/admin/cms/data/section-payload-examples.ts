/** Example JSON shapes shown as textarea placeholders when payloads are empty. */
const EXAMPLES: Record<string, string> = {
  announcements: `{
  "label": "LATEST",
  "ariaLabel": "Latest announcements",
  "items": [
    { "id": "item-1", "sortOrder": 1, "text": "Announcement text" }
  ]
}`,
  hero: `{
  "slides": [
    {
      "id": "slide-1",
      "badge": "Admissions Open",
      "title": "Headline",
      "description": "Supporting copy",
      "theme": "scholarship",
      "primaryAction": { "label": "Apply", "href": "#enquiry", "variant": "primary" },
      "secondaryAction": { "label": "Enquire", "href": "#enquiry", "variant": "outline" }
    }
  ]
}`,
  stats: `{
  "ariaLabel": "Why choose us",
  "items": [
    { "value": "🎓", "label": "Quality Education", "description": "Short note", "valueSize": "icon" }
  ]
}`,
  about: `{
  "sectionLabel": "About",
  "title": "Section title",
  "description": "About copy",
  "highlights": ["Point one", "Point two"],
  "cta": { "label": "Explore", "href": "#institutions" },
  "founder": {
    "quote": "Quote text",
    "name": "Founder name",
    "role": "Founder",
    "avatarInitial": "S",
    "badge": "NAAC B++",
    "badgeNote": "Optional note"
  }
}`,
  institutions: `{
  "sectionLabel": "Our Institutions",
  "title": "Pursue Your Passion at",
  "titleAccent": "SSRK",
  "description": "Intro copy for institutions"
}`,
  enquiry: `{
  "sectionLabel": "Admissions",
  "title": "Begin Your Journey",
  "description": "Enquiry intro copy",
  "highlights": ["Point one", "Point two"]
}`,
  institutions_page: `{
  "sectionLabel": "Our Institutions",
  "title": "Institutions page title",
  "description": "Page intro",
  "cardCtaLabel": "Visit College site"
}`,
  nav: `{
  "links": [
    { "label": "Home", "href": "/" },
    { "label": "Enquire Now", "href": "#enquiry", "cta": true }
  ]
}`,
  contact: `{
  "phones": ["+91 0000000000"],
  "emails": ["info@example.com"],
  "address": "Campus address",
  "mobilePhone": "+91 0000000000",
  "mobileEmail": "info@example.com",
  "locationLine": "Odisha, India"
}`,
  social: `{
  "links": [
    { "label": "Facebook", "href": "#", "glyph": "f" }
  ]
}`,
  footer_intro: `{
  "description": "Footer blurb",
  "locationLine": "Odisha, India"
}`,
  mobile_nav: `{
  "title": "Menu",
  "ariaLabel": "Mobile navigation",
  "items": [
    { "type": "link", "label": "Home", "routerLink": "/", "exact": true }
  ],
  "cta": { "label": "Enquire", "routerLink": "/", "fragment": "enquiry" },
  "contacts": [{ "icon": "📞", "text": "+91 0000000000" }]
}`,
  mobile_enquire: `{
  "label": "Enquire Now",
  "routerLink": "/",
  "fragment": "enquiry",
  "hideWhenSectionId": "enquiry",
  "visibleOnlyOnRoutes": ["/", "/institutions"]
}`,
  overview: `{
  "sectionLabel": "Overview",
  "title": "About the college",
  "description": "Overview copy",
  "highlights": ["Point one"]
}`,
  courses_intro: `{
  "sectionLabel": "Courses",
  "title": "Our courses",
  "description": "Courses intro copy"
}`,
  scholarships_intro: `{
  "sectionLabel": "Scholarships",
  "title": "Scholarship support",
  "description": "Scholarships intro copy"
}`,
};

const SHARED_EXAMPLE = `{
  "primaryColor": "#1e3a8a",
  "logoUrl": "https://example.com/logo.png"
}`;

const GENERIC_EXAMPLE = `{
  "title": "Section title",
  "description": "Section copy"
}`;

export function sectionPayloadExample(sectionKey: string): string {
  return EXAMPLES[sectionKey] ?? GENERIC_EXAMPLE;
}

export function sharedPayloadExample(): string {
  return SHARED_EXAMPLE;
}
