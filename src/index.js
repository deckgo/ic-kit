import {initButtons, initReload, postLoading} from '@deckdeckgo/kit';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            window.dispatchEvent(new Event('swUpdate'));
          }
        };
      };
    } catch (e) {
      console.warn('No service worker registered');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => postLoading(), {once: true});

initReload();
initButtons();
