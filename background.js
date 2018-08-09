var enabled = false;

chrome.browserAction.onClicked.addListener(tab => {
        enabled = !enabled;
        chrome.browserAction.setBadgeText(new String(enabled));
        console.log('hi');
});
