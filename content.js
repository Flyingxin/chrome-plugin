console.warn("content.js Welcome");

// 接收消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from === "background") {
    console.log("background -> content", request.data);
    // 回消息给background
    sendResponse("收到了你的情书💌");
  }
  if (request.from === "popup") {
    console.log("popup -> content", request.data);
    // 回消息给popup
    sendResponse("收到了你的情书💌");
  }
});

// 发送消息
chrome.runtime.sendMessage(
  // 发送消息给 background
  { from: "content", data: "Hello!" },
  // 接收 background 回复
  (response) => {
    console.log("content 接收 background", response);
  }
);
// 不能给popup发消息，是因为popup没有打开，所以popup没有监听消息的机会
