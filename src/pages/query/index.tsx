import React, { useEffect } from "react";
import { copyText } from "@/utils";
import observed from "@/utils/observed";

export default function Query() {
  useEffect(() => {}, []);

  const copyTextHandle = () => {
    console.log("observed", observed);
    observed.emit("customUpdate");
    copyText("222543");
  };

  return (
    <div>
      react-query
      <button onClick={copyTextHandle}>copy</button>
    </div>
  );
}
