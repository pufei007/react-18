import React, { useEffect } from "react";
import observed from "@/utils/observed";
import { Button } from "antd";

export default function Child() {
  return (
    <div>
      <span>Child</span>
      <Button
        onClick={() => {
          observed.emit("customUpdate");
        }}
      >
        emit
      </Button>
    </div>
  );
}
