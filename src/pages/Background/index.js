import PortalURLs from './urls';
console.log(PortalURLs)

// This is the script to keep it alive, not go inactive in background. If it deactivates, open tab data would be lost.
let lifeline;
keepAlive();
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});
function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}
async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}
async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}
// Done with keep alive script


async function getCurrentTab() {
  let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tab;
}

const openTabsOfInterest = [];
function checkUrl(url) {
  return PortalURLs.some(w => url.includes(w));
}
// Add an event listener for messages being passed through the pipeline
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // When the popup loads when the icon its clicked, it will send this event
    if (msg.msg === "popupLoaded") {
        const tab = sender.tab;
        console.log("SERVICE::::", sender)
        if(checkUrl(sender.tab.url)) {
          openTabsOfInterest.push({id: tab.id, url:tab.url, title:tab.title});
        }
        sendResponse(openTabsOfInterest);
        console.log("Service Worker: ", openTabsOfInterest)
    } 
    if(msg.msg === "content_pingtabid") {
      sendResponse({tab: sender.tab})
    }

    return true;
});