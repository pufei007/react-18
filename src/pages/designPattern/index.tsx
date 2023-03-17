import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "antd";
import Child from "./Child";
import observed from "@/utils/observed";
import eventEmitter from "@/utils/eventEmitter";

function index() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("observed", observed);
    console.log("EventEmitter", eventEmitter);
    observed.on("customUpdate", customUpdateHandle);
    eventEmitter.on("updateEvent", updateEvent);
    eventEmitter.once("updateEventOnce", updateEventOnce); // 对应事件 存在两个？

    return () => {
      observed.remove("customUpdate", customUpdateHandle);
      eventEmitter.off("updateEvent", updateEvent);
      eventEmitter.off("updateEventOnce", updateEventOnce);
    };
  }, []);

  const customUpdateHandle = () => {
    console.log("customUpdateHandle");
  };

  const updateEvent = (num: number) => {
    console.log("updateEvent=>num", num);
  };

  const updateEventOnce = (num: number) => {
    console.log("updateEventOnce=>num", num);
  };

  /**
   * 如果不传递给子组件，可以不使用 useCallback 包裹。因为 re-render 时只是重新定义了一遍，函数内部并没有执行。
   * 为什么要用 useCallback 包裹，因为 re-render 时前后创建的两个函数引用地址并不一样，Object.is 比较是否相同时会返回 false。
   */
  const request = useCallback(() => {
    setTimeout(() => {
      console.log("请求");
    }, 10);
  }, []);

  /**
   * 传递给子组件的引用数据类型需要使用 useMemo 包裹。其实和上面说的传递函数给组件，函数要用 useCallback 包裹起来是同一个道理。函数也是引用数据类型，是一个特殊的对象！
   */
  const obj = useMemo(
    () => ({
      name: "xiaowang",
      age: 19,
    }),
    []
  );

  return (
    <div>
      father
      <Button onClick={() => setCount(count + 1)}>add</Button>
      <Child request={request} obj={obj} />
    </div>
  );
}

export default index;
