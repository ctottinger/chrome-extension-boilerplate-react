// import { printLine } from './modules/print'; printLine("Using the 'printLine' function from the Print Module");


// The content scripts like this are the ones that can access the DOM of the current tabs.

console.log("HOWDY!")

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.msg === 'content_get_title') {
    sendResponse(document.title);
  }
});