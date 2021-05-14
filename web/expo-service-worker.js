/* eslint-env serviceworker */

self.addEventListener('push', (event) => {
  const { title, body, icon } = event.data.json();
  event.waitUntil(self.registration.showNotification(title, { body, icon }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    (async () => {
      if (
        event.notification.data != null &&
        event.notification.data.url != null
      ) {
        await self.clients.openWindow(event.notification.data.url);
      }
    })()
  );
});
