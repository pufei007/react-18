import React, { useEffect, useRef } from "react";
// import { Cesium } from "cesium";
import { Viewer, Entity, Cartesian3, Color } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
import "./index.less";

const Cesium = () => {
  const csmViewerRef = useRef<null | Viewer>(null);
  const viewerContainerRef = useRef(null);

  useEffect(() => {
    if (viewerContainerRef.current && !csmViewerRef.current) {
      csmViewerRef.current = new Viewer("csm-viewer-container");
    }
  }, [viewerContainerRef]);

  // const addEntityBillboard = () => {
  //   let entityBillBoard = new Entity({
  //     id: "EntityBillboard0",
  //     name: "EntityBillboard",
  //     show: true,
  //     description: "广告牌招租13390133157",
  //     position: new Cartesian3.fromDegrees(116.0, 39.9, 100),
  //     billboard: {
  //       image: "static/image/ziranzaihai.png",
  //       show: true,
  //       scale: 1000.01,
  //       color: Color.YELLOWGREEN,
  //       width: 100,
  //       height: 100,
  //     },
  //   });
  //   // let billboadrGeom = window.viewer.entities.add(entityBillBoard);
  //   // window.viewer.zoomTo(entityBillBoard);
  // };

  return <div className="csm-viewer-container" id="csm-viewer-container" ref={viewerContainerRef}></div>;
};

export default Cesium;
