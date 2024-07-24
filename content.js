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

// const getMyOrders = async () => {
//     let response = await fetch("https://h5api.m.taobao.com/h5/mtop.alibaba.topservice.order.list.get/1.0/?jsv=2.6.1&appKey=12574478&t=1721834347344&sign=f76e878b38d7c997e7376dc10181e9bf&api=mtop.alibaba.topservice.order.list.get&v=1.0&valueType=string&dataType=originaljsonp&type=jsonp&callback=mtopjsonp7&data=%7B%22env%22%3A%22online%22%2C%22payUrl%22%3A%22%2Fser%2ForderPayNew.htm%22%2C%22pageSize%22%3A10%2C%22tabCode%22%3A%22all%22%2C%22currentPage%22%3A%221%22%7D", {
//         "headers": {
//           "accept": "*/*",
//           "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
//           "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-fetch-dest": "script",
//           "sec-fetch-mode": "no-cors",
//           "sec-fetch-site": "same-site"
//         },
//         "referrer": "https://fuwu.taobao.com/",
//         "referrerPolicy": "strict-origin-when-cross-origin",
//         "body": null,
//         "method": "GET",
//         "mode": "cors",
//         "credentials": "include"
//       });
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     response = await response.text();
//     response = parseJSONP(response);
//     console.log('response', response.data.list);
//     const orderNameList = response.data.list.map(item => item.articleName);
//     chrome.runtime.sendMessage(chrome.runtime.id, {
//         from: "myOrders",
//         data: orderNameList,
//     })
// }
// const inTimer = setInterval(() => {
//     getMyOrders()
// }, 2000);
// getMyOrders()

// 解析 JSONP 格式的字符串
// const parseJSONP = (jsonpString) => {
//     // 假设 JSONP 格式为 mtopjsonp7({...})
//     const jsonpPattern = / *mtopjsonp[1-9]\((.*)\);?$/;
//     const match = jsonpString.match(jsonpPattern);
//     if (match) {
//         // 提取 JSON 字符串
//         const jsonString = match[1];
//         // 解析 JSON 字符串为对象
//         return JSON.parse(jsonString);
//     }
//     throw new Error('Invalid JSONP format');
// };
