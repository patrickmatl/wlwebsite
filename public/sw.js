/* Service worker for WL CreationX studio push notifications. */

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'WL CreationX', body: event.data ? event.data.text() : '' };
  }

  const title = data.title || 'New enquiry';
  const options = {
    body: data.body || '',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    tag: data.tag || 'wl-lead',
    renotify: true,
    data: { url: data.url || '/studio' },
    actions: [{ action: 'open', title: 'Review' }],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/studio';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes('/studio') && 'focus' in client) return client.focus();
      }
      return self.clients.openWindow(url);
    }),
  );
});
