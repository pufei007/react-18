import React from "react";
import { BaseTable } from "ali-react-table";
import S from "./index.module.css";

const index = () => {
  const dataSource = [
    {
      prov: "湖北省",
      confirmed: 54406,
      cured: 4793,
      dead: 1457,
      t: "2020-02-15 19:52:02",
    },
    {
      prov: "广东省",
      confirmed: 1294,
      cured: 409,
      dead: 2,
      t: "2020-02-15 19:52:02",
    },
    {
      prov: "河南省",
      confirmed: 1212,
      cured: 390,
      dead: 13,
      t: "2020-02-15 19:52:02",
    },
    {
      prov: "浙江省",
      confirmed: 1162,
      cured: 428,
      dead: 0,
      t: "2020-02-15 19:52:02",
    },
    {
      prov: "湖南省",
      confirmed: 1001,
      cured: 417,
      dead: 2,
      t: "2020-02-15 19:52:02",
    },
  ];
  const list = Array.from({ length: 1000 })
    .fill("")
    .map((item, index) => {
      return {
        prov: "湖北省",
        confirmed: 54406,
        cured: 4793,
        dead: index,
        t: "2020-02-15 19:52:02",
      };
    });

  const columns: any = [
    { code: "prov", name: "省份", width: 150 },
    { code: "confirmed", name: "确诊", width: 100, align: "right" },
    { code: "cured", name: "治愈", width: 100, align: "right" },
    { code: "dead", name: "死亡", width: 100, align: "right" },
    { code: "t", name: "最后更新时间", width: 180 },
  ];
  return (
    <div
      className="scroll-container"
      // style={{ overflow: "auto", width: 500, height: 300 }}
    >
      <BaseTable
        dataSource={list}
        columns={columns}
        style={{ overflow: "auto", maxHeight: "300px" }}
      />
    </div>
  );
};

export default index;
