console.warn("popup.js Welcome");
const button = document.getElementById("go");
button.addEventListener("click", async function () {
  // 发送消息给background
  chrome.runtime.sendMessage(
    // 发送消息给 background
    { from: "popup", data: "Hello!" },
    // 接收 background 回复
    (response) => {
      console.log("popup 收到 background", response);
    }
  );
  // 发送消息给content
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      // tabId
      tabs[0].id,
      // 发送消息给 content
      { from: "popup", data: "Hello!" },
      // 接收 content 回复
      (response) => {
        console.log("popup 收到 content", response);
      }
    );
  });
});

// 无法直接获取接收消息，popup没有打开，所以popup没有加载，所以popup没有监听消息的机会
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.from === "background") {
//     console.log("popup 接收 background", request.data);
//   }
//   if (request.from === "content") {
//     console.log("popup 接收 content", request.data);
//   }
// });
// 按道理还是可以接收得到，但是popup没有打开的需求没有意义
// 插件执行过程中接收按理说可以，拭目以待
