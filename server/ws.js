const WebSocket = require("ws");

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8000 });

// 监听 WebSocket 连接事件
wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  // 监听 WebSocket 消息事件
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // 响应消息
    ws.send(
      JSON.stringify({
        cmd: `${message}`, //push msg
        data: {
          msg: "响应消息" + `${message}`,
          list: [1, 2, 3, 4, 5],
        },
      })
    );
  });

  // 监听 WebSocket 关闭事件
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
// 模拟前端调用接口并发送推送消息
setTimeout(() => {
  const ws = new WebSocket("ws://localhost:8000");
  ws.on("open", () => {
    console.log("WebSocket connection established");
    ws.send(
      JSON.stringify({
        type: "push",
        message: "This is a push message from the server",
      })
    );
  });
}, 5000);
