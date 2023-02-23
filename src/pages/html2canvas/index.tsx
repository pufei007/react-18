import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import html2canvas from "html2canvas";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import domtoimage from "dom-to-image";
import "./index.less";

const index: React.FC = () => {
  useEffect(() => {}, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
    // @ts-ignore
    html2canvas(document.getElementById("img")).then(function (canvas) {
      document.body.appendChild(canvas);
    });

    const node = document.getElementById("img") || document.body;

    domtoimage
      .toPng(node, { quality: 1 })
      .then(function (dataUrl: any) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error: any) {
        console.error("oops, something went wrong!", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const trans = () => {
    html2canvas(document.body).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  };

  const domto = () => {
    const node = document.body;

    domtoimage
      .toPng(node)
      .then(function (dataUrl: any) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error: any) {
        console.error("oops, something went wrong!", error);
      });
  };

  const getOption = () => {
    const option = {
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
      title: {
        text: "Gradient Stacked Area Chart",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Line 1",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [140, 232, 101, 264, 90, 340, 250],
        },
        {
          name: "Line 2",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(0, 221, 255)",
              },
              {
                offset: 1,
                color: "rgb(77, 119, 255)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [120, 282, 111, 234, 220, 340, 310],
        },
        {
          name: "Line 3",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(55, 162, 255)",
              },
              {
                offset: 1,
                color: "rgb(116, 21, 219)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [320, 132, 201, 334, 190, 130, 220],
        },
        {
          name: "Line 4",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 0, 135)",
              },
              {
                offset: 1,
                color: "rgb(135, 0, 157)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 402, 231, 134, 190, 230, 120],
        },
        {
          name: "Line 5",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 191, 0)",
              },
              {
                offset: 1,
                color: "rgb(224, 62, 76)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 302, 181, 234, 210, 290, 150],
        },
      ],
    };
    return option;
  };

  return (
    <div className="pageMain">
      <Button onClick={trans}>html to canvas</Button>
      <Button onClick={domto}>domtoimage</Button>

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div id="img">
          <div style={{ paddingTop: 500 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
            distinctio mollitia rem ipsam unde corrupti dolores fugiat fuga. Et
            aliquid fuga quas nesciunt tempora nostrum neque quidem eveniet ex
            amet!
          </div>
          <ReactECharts option={getOption()} />
        </div>
      </Modal>
    </div>
  );
};
export default index;
