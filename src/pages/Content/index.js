// import { printLine } from './modules/print'; printLine("Using the 'printLine' function from the Print Module");


// Get the current tab ID, crucial to targetting specific tabs since runtime msgs are sent out en masse
// All the important stuff has to happen after the tab id is discovered, so most of the logic must be contained here
chrome.runtime.sendMessage({ msg: "content_pingtabid" }, response => {
  const id = response.tab.id;
  console.log('CONTENT_SCRIPT ::::: tab ==', id);

  
});


// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.msg === 'content_get_title') {
    sendResponse(document.title);
  }
});