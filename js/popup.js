console.warn("popup.js Welcome");
const go = document.getElementById("go");
const interval = document.getElementById("interval");
const leave = document.getElementById("leave");

// 获取订单信息
go.addEventListener("click", async function () {
  // 发送消息给content
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      // tabId
      tabs[0].id,
      // 发送消息给 content
      { from: "popup", data: "getOrderInfo" }
    );
  });
});
// 开启定时获取订单信息
interval.addEventListener("click", async function () {
  // 发送消息给content
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      // tabId
      tabs[0].id,
      // 发送消息给 content
      { from: "popup", data: "intervalGetOrderInfo" }
    );
  });
});
// 关闭订单信息
leave.addEventListener("click", async function () {
  // 发送消息给content
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      // tabId
      tabs[0].id,
      // 发送消息给 content
      { from: "popup", data: "closeOrderInfo" }
    );
  });
});
