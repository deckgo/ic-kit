import {initReload, initButtons, initFullscreen, initActions, postLoading, initRemote} from "@deckdeckgo/kit";

document.addEventListener('DOMContentLoaded', async () => {
    await postLoading();
    await initActions();
    await initFullscreen();

    await initRemote();
}, {once: true})

initReload();
initButtons();
