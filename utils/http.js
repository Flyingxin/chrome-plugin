// const https = require("https");

// const api = (url, data) => {
//   return new Promise((resolve, reject) => {
//     https
//       .get(url, (res) => {
//         let data = "";

//         // 接收数据块
//         res.on("data", (chunk) => {
//           data += chunk;
//         });

//         // 完成响应
//         res.on("end", () => {
//           resolve(JSON.parse(data));
//         });
//       })
//       .on("error", (err) => {
//         reject(err);
//       });
//   });
// };

// exports.api = api;
