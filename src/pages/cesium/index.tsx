import React, { useEffect, useState, useRef } from "react";
import * as Cesium from "cesium";
import {
  Viewer,
  Entity,
  Math,
  Cartesian3,
  Color,
  ArcGisMapServerImageryProvider,
} from "cesium";
import CesiumController from "./controller";
// import "cesium/Build/Cesium/Cesium";
import icon from "../../assets/location.svg";
import demoCzml from "./demo";
import simple from "./simple";
import axios from "axios";
// @ts-ignore
import CesiumSensorVolumes from "cesium-sensors/lib/custom/custom-sensor-volume";
import "./index.less";

const CesiumPage = () => {
  const [cesium, setCesium] = useState<CesiumController | null>(null);
  const [czml, setCzml] = useState<any>([]);

  useEffect(() => {
    const cesiumOl = new CesiumController("cesiumMap");
    setCesium(cesiumOl);

    return () => {
      setCesium(null);
    };
  }, []);

  useEffect(() => {
    if (cesium) {
      // cesium.start();
      getCzmlData?.(cesium);
    }
  }, [cesium]);

  useEffect(() => {
    if (!cesium) return;
    console.log("czml", czml);
    // cesium?.loadCzml(czml);
  }, [cesium, czml]);

  const getCzmlData = async (cesium: any) => {
    try {
      const res = await axios.get("../simple.czml");
      console.log("res", res);
      const { data = "[]" } = res;
      console.log("data", data);

      data.forEach((item: any) => {
        if (item.id === "document") {
          item.clock.range = "CLAMPED";
          // item.clock.currenTime = item.clock.currentTime.toString();
          item.clock.currentTime = "2012-03-15T10:00:00Z";
        }
      });
      // console.log("res", JSON.parse(data));
      // cesium?.loadCzml("../simple.czml");

      const czml11 = [
        {
          id: "document",
          name: "CZML Point - Time Dynamic",
          version: "1.0",
        },
        {
          id: "point",
          // 物体在什么时间范围可用
          availability: "2012-08-04T16:00:00Z/2012-08-04T16:05:00Z",
          position: {
            // 设置物体的起始时间
            epoch: "2012-08-04T16:00:00Z",
            // 设置了四个维度，四个维度为一个整体；1维是时间，2维是经度，3维是纬度，4维是高度
            cartographicDegrees: [
              0, -70, 20, 150000, 100, -80, 44, 150000, 200, -90, 18, 150000,
              300, -98, 52, 150000,
            ],
          },
          point: {
            color: {
              rgba: [255, 255, 255, 128],
            },
            outlineColor: {
              rgba: [255, 0, 0, 128],
            },
            outlineWidth: 3,
            pixelSize: 15,
          },
        },
      ];

      cesium.loadCzml(czml11);
      // setCzml(data);
    } catch (error) {
      console.error(error);
    }
  };

  return <div className="csm-viewer-container" id="cesiumMap"></div>;
};

export default CesiumPage;
