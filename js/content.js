console.warn("content.js Welcome");

let timer = null;
// 接收消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from === "popup") {
    switch (request.data) {
      case "getOrderInfo":
        getMyOrders();
        break;
      case "intervalGetOrderInfo":
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
          getMyOrders();
        }, 3000);
        break;
      case "closeOrderInfo":
        clearInterval(timer);
        timer = null;
        break;
    }
  }
});

const getMyOrders = async () => {
  let response = await fetch(
    "https://h5api.m.taobao.com/h5/mtop.alibaba.topservice.order.list.get/1.0/?jsv=2.6.1&appKey=12574478&t=1721924912070&sign=1ebd1eef54e1667262e1327327537e16&api=mtop.alibaba.topservice.order.list.get&v=1.0&valueType=string&dataType=originaljsonp&type=jsonp&callback=mtopjsonp8&data=%7B%22env%22%3A%22online%22%2C%22payUrl%22%3A%22%2Fser%2ForderPayNew.htm%22%2C%22pageSize%22%3A10%2C%22tabCode%22%3A%22all%22%2C%22currentPage%22%3A%221%22%7D",
    {
      headers: {
        cookie:
          "cookie2=15ee3d4a7e6f7655974c14437ebd3fcd; t=3e301986d4d5cdce6ad4f38ea4bcd1b9; _tb_token_=786347eb8e5e3; xlly_s=1; mtop_partitioned_detect=1; _m_h5_tk=d2c96cb787a49cc882c054943eec743a_1721930820600; _m_h5_tk_enc=6eb78f2686ced84366b8a87cc0b07633; 3PcFlag=1721923626893; unb=2201478220047; lgc=tb616717184; cancelledSubSites=empty; cookie17=UUphy%2FZ9uP8pZ4EReg%3D%3D; dnk=tb616717184; tracknick=tb616717184; _l_g_=Ug%3D%3D; sg=47d; _nk_=tb616717184; cookie1=VqgqprOsJjmNLKN9yLW%2BCWHBA77k2PIKji0Cz4OuRiw%3D; sgcookie=E100%2BvXHC3nFfi%2BkbTWjBr8MOASuaOEPCesOtR5f7QEork%2Fx7vWe3GZM%2Bf5Vc02NIM7zAid3FSik2F9IPGtEi3K1B%2FsaLKPi1i7UF8DdnEqO9y1jQipKn5OiSQsMJ7j%2FHuoi; havana_lgc2_0=eyJoaWQiOjIyMDE0NzgyMjAwNDcsInNnIjoiMmM2OTZmZjM3MzA2NTY0ZWY4ZGI2YThkMjg5ZDRjNWYiLCJzaXRlIjowLCJ0b2tlbiI6IjFZYmM4RjFJb2pVQVo3TmFzNUlpQzZnIn0; _hvn_lgc_=0; havana_lgc_exp=1753027632715; cookie3_bak=15ee3d4a7e6f7655974c14437ebd3fcd; cookie3_bak_exp=1722182832715; wk_cookie2=1b42098fcf381975d55a76822ba2ddce; wk_unb=UUphy%2FZ9uP8pZ4EReg%3D%3D; sn=; uc3=vt3=F8dD3ijGtwcNPo%2Bk6TU%3D&nk2=F5RDLeMsPO8CNfs%3D&id2=UUphy%2FZ9uP8pZ4EReg%3D%3D&lg2=WqG3DMC9VAQiUQ%3D%3D; csg=f7830298; env_bak=FM%2Bgz3ym37t%2FFkdzMQz5dhi%2BaoyJj6KzBxSLaUu3pN%2Fi; skt=55b1a40373fc9475; existShop=MTcyMTkyMzYzMg%3D%3D; uc4=id4=0%40U2grEJGCKQ3F8IwvzBE%2FosNrW91A03bc&nk4=0%40FY4I7jF0b%2FrkW2%2FZ28lZEXl2X3Y5Ug%3D%3D; _cc_=Vq8l%2BKCLiw%3D%3D; uc1=cookie14=UoYcAjgTl0l7LQ%3D%3D; tfstk=fkpj6gZAGr4XTF-5SsnPdBzp0IX1lEMUCls9xhe4XtBY1RKpA1eZit51CUQy3Z-VHoAk8He23jXaCtXGB2uELv-2mOXT8YuHarXRAG2tQZIOyIFOF2uELYlY2Ogj8ClQ0iC5faIAXZCxVzIGAOIAD1n5yGs36rLOB0tRrMSYWieO2zIGbv9oFgoNlni5ubOW5jr2oawTdujfMUHhyRe9Fit5JnF7BRp5cs9aGiUg8sR9x6v2HAwl3HOReM-mh86pDMTVzeHLFTKy2F5HZV2FZU916KC0X0QJhU9cHElTde6X56pANlewAnQfFgpKbWbyFZ89h_nUd1WJL6Bvab0V_tsBWKYbfRLp4HJcZdgQyNAVxTIemxw5pnIO4LyFRYh_1u13Cg_EV0Ng_GfiIzN82ltPMgjz80i7lTCAqg_EV0NgssIl4DoSVr6R.; isg=BEREPMSp_pWngkraG_ZWqwkFFcI2XWjHAa1CwF7lmo_SieVThmtaV15hzSlRkaAf",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  response = await response.text();
  response = parseJSONP(response);
  if (!response.data.list) {
    console.error(response.ret[0]);
    return;
  }
  const orderNameList = response.data.list.map((item) => item.articleName);
  console.log("orderNameList", orderNameList);
};

// 解析 JSONP 格式的字符串
const parseJSONP = (jsonpString) => {
  // 假设 JSONP 格式为 mtopjsonp7({...})
  const jsonpPattern = / *mtopjsonp[1-9]\((.*)\);?$/;
  const match = jsonpString.match(jsonpPattern);
  if (match) {
    // 提取 JSON 字符串
    const jsonString = match[1];
    // 解析 JSON 字符串为对象
    return JSON.parse(jsonString);
  }
  throw new Error("Invalid JSONP format");
};
