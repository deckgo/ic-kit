import {initReload, initButtons, initFullscreen, initActions, postLoading, initRemote} from "@deckdeckgo/kit";

(async function() {
    await postLoading();
    await initActions();
    await initFullscreen();

    await initRemote();
}());

initReload();
initButtons();
