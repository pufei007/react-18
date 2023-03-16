import React, { useEffect } from "react";
import { copyText } from "@/utils";
import observed from "@/utils/observed";
import eventEmitter from "@/utils/eventEmitter";

export default function Query() {
  useEffect(() => {}, []);

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
      <button onClick={copyTextHandle}>copy</button>
    </div>
  );
}
