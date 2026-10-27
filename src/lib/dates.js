// Date helpers shared by the build (server) and the browser.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Accepts "2026-10-21" or a full ISO timestamp from GitHub ("2026-10-21T09:14:02Z").
// Bare dates are pinned to midday UTC so they never slip a day in any timezone.
export function toDate(iso) {
  return new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso);
}

// "today", "3 days ago", "2 weeks ago", "4 months ago"
export function relative(iso, now = new Date()) {
  const days = Math.floor((now - toDate(iso)) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return '1 month ago';
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

// "Oct 21, 2026"
export function absolute(iso) {
  const d = toDate(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export function daysSince(iso, now = new Date()) {
  return Math.floor((now - toDate(iso)) / 86400000);
}
