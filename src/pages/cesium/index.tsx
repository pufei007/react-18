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
    if (!cesium || !czml?.length) return;
    // cesium?.loadCzml1(demoCzml);
    cesium?.loadCzml(czml);
  }, [cesium, czml]);

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
