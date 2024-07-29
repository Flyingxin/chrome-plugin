// 百度翻译 API 配置
const https = require("https");
const md5 = require("../libs/md5.min");
const { appid, secretKey } = require("../const");

const translate = (query, from, to) => {
  const salt = new Date().getTime();

  // 组装请求参数
  const params = new URLSearchParams({
    q: query,
    from,
    to,
    appid,
    salt,
    sign: md5(appid + q + salt + secretKey), // 计算签名
  });

  // 发送 https 请求
  const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?${params}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        // 接收数据块
        res.on("data", (chunk) => {
          data += chunk;
        });

        // 完成响应
        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
