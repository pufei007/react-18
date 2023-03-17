import React, { useEffect, memo } from "react";
import observed from "@/utils/observed";
import eventEmitter from "@/utils/eventEmitter";
import { Button } from "antd";

interface Props {
  request: () => void;
  obj: {
    name: string;
    age: number;
  };
}

const Child = (props: Props) => {
  console.log("re-render");
  console.log("props", props);

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
      <Button onClick={props.request}>father request</Button>
    </div>
  );
};

export default memo(Child);
