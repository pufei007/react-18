import React, { useEffect, useState } from "react";
import { copyText } from "@/utils";
import observed from "@/utils/observed";
import eventEmitter from "@/utils/eventEmitter";
import { get, post } from "@/utils/request";
import RegExps from "@/utils/reg";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";

export default function Query() {
  const [topList, setTopList] = useState([]);
  const router = useNavigate();
  const ip = RegExps.IP;

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

    setTopList(res.data);
    console.log("res", res);
    message.success("getList success");
  };

  const getTopList = async () => {
    const res = await get("/api/getTopList", { page: 1, pageSize: 20 });
    if (!res || res?.code !== 1) return message.error(res?.msg || "fail");

    setTopList(res.data);
    console.log("res", res);
    message.success("getTopList success");
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
      <Button type="primary" onClick={() => router("/query")}>
        go to query
      </Button>
      <br />
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
      <Button type="primary" onClick={getTopList}>
        getTopList
      </Button>
      <br />
      TOP LIST
      <div>
        {topList?.map((item: any, index: number) => (
          <a key={index} href={item.url} target="_blank" rel="noreferrer">
            <div>{item.index}</div>
            <div>{item.title}</div>
            <div>{item.hot}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
