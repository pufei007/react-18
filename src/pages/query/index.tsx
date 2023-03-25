import React, { useEffect } from "react";
import { copyText } from "@/utils";
import observed from "@/utils/observed";
import eventEmitter from "@/utils/eventEmitter";
import { get, post } from "@/utils/request";
import { Button, message } from "antd";

export default function Query() {
  useEffect(() => {}, []);

  const register = async () => {
    const res = await post("/api/register", {
      userName: "lisi",
      password: "123456",
    });
    if (!res || res?.code !== 1) return message.error(res?.msg || "fail");

    console.log("res", res);

    message.success("register success");
  };

  const login = async () => {
    const res = await post("/api/login", {
      userName: "lisi",
      password: "123456",
    });
    if (!res || res?.code !== 1) return message.error(res?.msg || "fail");

    console.log("res", res);
    message.success("login success");
  };

  const getList = async () => {
    const res = await get("/api/list", { page: 1, pageSize: 20 });
    if (!res || res?.code !== 1) return message.error(res?.msg || "fail");

    console.log("res", res);
    message.success("login success");
  };

  const copyTextHandle = () => {
    console.log("observed", observed);
    console.log("eventEmitter", eventEmitter);
    observed.emit("customUpdate");
    eventEmitter.emit("updateEvent", 2);
    copyText("222543");
  };

  return (
    <div>
      react-query
      <Button onClick={copyTextHandle}>copy</Button>
      <br />
      <Button type="primary" onClick={login}>
        login
      </Button>
      <br />
      <Button type="primary" onClick={register}>
        register
      </Button>
      <br />
      <Button type="primary" onClick={getList}>
        getList
      </Button>
    </div>
  );
}
