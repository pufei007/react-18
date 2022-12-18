import React, { useEffect } from "react";
import { copyText } from "../../utils";

export default function Query() {
  useEffect(() => {}, []);

  const copyTextHandle = () => {
    copyText("222543");
  };

  return (
    <div>
      react-query
      <button onClick={copyTextHandle}>copy</button>
    </div>
  );
}
