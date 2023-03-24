import React, { useRef, useEffect } from "react";
import CesiumEarth from "./CesiumEarth";
import * as Cesium from "cesium";

function Earth() {
  const cesiumContainer = useRef(null);

  useEffect(() => {
    const cesium = new CesiumEarth(cesiumContainer.current);
    const start = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
    const end = Cesium.Cartesian3.fromDegrees(-80.5, 41.0);
    const line = cesium.drawLine(start, end);
    const center = Cesium.Cartesian3.fromDegrees(-74.0, 40.0);
    const circle = cesium.drawCircle(center, 50000);
    const distance = cesium.measureDistance(start, end);
    console.log(distance);
    return () => {
      cesium.viewer.destroy();
    };
  }, []);

  return <div ref={cesiumContainer} style={{ height: "100vh" }}></div>;
}

export default Earth;
