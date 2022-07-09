console.log('Loaded background script');

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function sendAlert(msg) {
  // chrome.tabs.sendMessage(, );
  var ct = await getCurrentTab();
  ct = ct.id;

  chrome.tabs.sendMessage(ct, {text: 'alert_this', 'msg':msg});

}

// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;

// A function to use as callback
function doStuffWithDom(domContent) {
    // console.log('I received the following DOM content:\n' + domContent);
    console.log(domContent);
    sendAlert("Hiya! You seem to be researching \""+ domContent +"\"")
}

// When the browser-action button is clicked...
chrome.action.onClicked.addListener(function (tab) {
    console.log("Action Button Clicked", tab)
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    }
});