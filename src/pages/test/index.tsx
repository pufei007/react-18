import React from "react";
import RegExps from "@/utils/reg";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Test = () => {
  // 路由跳转
  const router = useNavigate();
  const ip = RegExps.IP;

  return (
    <div>
      test
      <Button type="primary" onClick={() => router("/query")}>
        go to query
      </Button>
    </div>
  );
};

export default Test;
