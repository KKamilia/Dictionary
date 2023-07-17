// setup context menu
function setupContextMenu() {
    chrome.contextMenus.create({
        id: 'lookup',
        title: 'Lookup \"%s\"',
        contexts: ['selection']
    });
}

// add listener for selection & call function setupContext
chrome.runtime.onInstalled.addListener(() => {
    setupContextMenu();
});

//pass variable to the side_panel by send message
chrome.contextMenus.onClicked.addListener((data) => {

    chrome.runtime.sendMessage({
        name: 'lookup',

        //TODO: refactor as pass value function
        data: { value: data.selectionText }
    });
});
