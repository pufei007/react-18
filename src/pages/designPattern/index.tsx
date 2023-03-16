import React, { useEffect } from "react";
import Child from "./Child";
import observed from "@/utils/observed";
import eventEmitter from "@/utils/eventEmitter";

function index() {
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

  return (
    <div>
      father
      <Child />
    </div>
  );
}

export default index;
