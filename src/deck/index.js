import {initFullscreen, initActions, postLoadingDeck, initRemote} from "@deckdeckgo/kit";

document.addEventListener('DOMContentLoaded', async () => {
    await postLoadingDeck();
    await initActions();
    await initFullscreen();

    await initRemote();
}, {once: true})
