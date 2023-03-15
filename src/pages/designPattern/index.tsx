import React, { useEffect } from "react";
import Child from "./Child";
import observed from "@/utils/observed";

function index() {
  useEffect(() => {
    console.log("observed", observed);
    observed.on("customUpdate", customUpdateHandle);

    return () => {
      observed.remove("customUpdate", customUpdateHandle);
    };
  }, []);

  const customUpdateHandle = () => {
    console.log("customUpdateHandle");
  };

  return (
    <div>
      father
      <Child />
    </div>
  );
}

export default index;
