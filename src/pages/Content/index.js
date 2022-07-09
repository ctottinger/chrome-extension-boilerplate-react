// import { printLine } from './modules/print';

// printLine("Using the 'printLine' function from the Print Module");


// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("Got the bat-signal!");
  // console.log(msg, sender)

  // If the received message has the expected format...
  if (msg.text === 'report_back') {
      // Call the specified callback, passing
      // the web-page's DOM content as argument
      sendResponse(document.querySelector(".question-hyperlink").innerText);
  } else if(msg.text === 'alert_this') {
    window.alert(msg.msg);
  }
});