console.warn("background.js Welcome");

// 监听content_scripts页面发来的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from === "popup") {
    console.log("popup -> background", request.data);
    // 回消息给popup
    sendResponse("收到了你的情书💌");
  }
  if (request.from === "content") {
    console.log("content -> background", request.data);
    // 回消息给popup
    sendResponse("收到了你的情书💌");
  }
  if (request.from === "myOrders") {
    console.log("content -> background", request.data);
  }
});
