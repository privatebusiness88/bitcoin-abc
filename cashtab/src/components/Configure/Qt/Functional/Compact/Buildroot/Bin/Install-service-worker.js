 

/* eslint-env browser */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {
    scope: '/Run/',
  });
}
