import React, { useEffect } from "react";
import observed from "@/utils/observed";
import eventEmitter from "@/utils/eventEmitter";
import { Button } from "antd";

export default function Child() {
  return (
    <div>
      <span>Child</span>
      <Button
        onClick={() => {
          observed.emit("customUpdate");
          eventEmitter.emit("updateEvent", 2);
          console.log("eventEmitter", eventEmitter);
          eventEmitter.emit("updateEventOnce", 3);
        }}
      >
        emit
      </Button>
    </div>
  );
}
