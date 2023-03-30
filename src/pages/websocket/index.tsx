import React, { useEffect, useState } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import pubsub from "pubsub-js";
import Child from "./child";

const App = () => {
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState<any>(null);

  // 连接 WebSocket 服务器
  useEffect(() => {
    const client = new WebSocket("ws://localhost:8000/");

    // 监听 WebSocket 连接成功事件
    client.onopen = () => {
      console.log("WebSocket connection established");
      setWs(client);
    };

    // 监听 WebSocket 消息事件
    client.onmessage = (event: any) => {
      console.log(`Received message: ${event.data}`);
      console.log("event.data", event.data);
      const res = JSON.parse(event.data);
      console.log("res", res);
      pubsub.publish(res?.cmd, res);
      setMessage(` ${event.data}`);
    };

    // 监听 WebSocket 关闭事件
    client.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      client?.close?.();
    };
  }, []);

  // 发送消息到 WebSocket 服务器
  const sendMessage = (msg: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>{message}</p>
      <button onClick={() => sendMessage("push")}>Send Message: push</button>
      <button onClick={() => sendMessage("msg")}>Send Message: msg</button>
      <Child />
    </div>
  );
};

export default App;
