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
import icon from "../../assets/location.svg";
import demoCzml from "./demo";
import simple from "./simple";
import axios from "axios";
import "./index.less";

const CesiumPage = () => {
  const [cesium, setCesium] = useState<CesiumController | null>(null);
  const [czml, setCzml] = useState<any>([]);
  const viewerContainerRef = useRef(null);

  useEffect(() => {
    let cesiumOl = new CesiumController(viewerContainerRef.current);
    setCesium(cesiumOl);

    return () => {
      if (!cesiumOl.viewer.isDestroyed()) {
        cesiumOl.viewer.destroy(); // 必须
      }
      setCesium(null);
    };
  }, []);

  useEffect(() => {
    if (cesium) {
      getCzmlData?.();
    }
  }, [cesium]);

  useEffect(() => {
    if (!cesium) return;
    // cesium?.loadCzml1(demoCzml);
    // cesium?.loadCzml(czml);

    // const start = new Cesium.Cartesian3(
    //   -14516939.0194339,
    //   -3368384.25750661,
    //   30226792.3721741
    // );

    // const end = new Cesium.Cartesian3(
    //   4650397.56551457,
    //   -3390535.52275848,
    //   -4087729.48877329
    // );

    // cesium.viewer.entities.add({
    //   corridor: {
    //     positions: [start, end],
    //     width: 1000, // 波束的宽度
    //     material: Cesium.Color.RED, // 波束的颜色
    //   },
    // });

    // 定义波束的起始点和终止点（经度、纬度和高度）
    const startPoint = Cesium.Cartesian3.fromDegrees(-75.0, 40.0, 0.0);
    const endPoint = Cesium.Cartesian3.fromDegrees(-74.0, 41.0, 3333333333);
    console.log(cesium.viewer.entities);
    // 创建波束的图形
    cesium.viewer.entities.add({
      corridor: {
        positions: [startPoint, endPoint],
        width: 1000, // 波束的宽度
        material: Cesium.Color.RED, // 波束的颜色
      },
    });
  }, [cesium]);

  const getCzmlData = async () => {
    try {
      const res = await axios.get("../simple.czml");
      const { data = "[]" } = res;
      console.log("data", data);

      data.forEach((item: any) => {
        if (item.id === "document") {
          item.clock.range = "CLAMPED";
          // item.clock.currenTime = item.clock.currentTime.toString();
          item.clock.currentTime = "2012-03-15T10:00:00Z";
        }
      });
      setCzml(data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div
      className="csm-viewer-container"
      id="cesiumMap"
      ref={viewerContainerRef}
    ></div>
  );
};

export default CesiumPage;
