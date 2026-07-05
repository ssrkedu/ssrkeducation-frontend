export function scrollToEnquirySection(behavior: ScrollBehavior = 'smooth'): boolean {
  const section = document.getElementById('enquiry');
  if (!section) {
    return false;
  }

  section.scrollIntoView({ behavior, block: 'start' });
  return true;
}

export function shouldOpenEnquiryFromUrl(): boolean {
  const institution = new URLSearchParams(window.location.search).get('institution');
  const hash = window.location.hash.replace(/^#/, '').split('?')[0];

  return hash === 'enquiry' || !!institution;
}

export function clearMisplacedEnquiryHash(): void {
  const hash = window.location.hash.replace(/^#/, '').split('?')[0];
  if (hash !== 'enquiry') {
    return;
  }

  history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}`,
  );
  window.scrollTo(0, 0);
}

export function scrollToEnquiryWhenReady(maxAttempts = 40): void {
  if (!shouldOpenEnquiryFromUrl()) {
    return;
  }

  let attempts = 0;
  const tryScroll = () => {
    if (scrollToEnquirySection(attempts === 0 ? 'auto' : 'smooth')) {
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  requestAnimationFrame(tryScroll);
}
