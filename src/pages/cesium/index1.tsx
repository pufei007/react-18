import React, { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import {
  Viewer,
  Entity,
  Math,
  Cartesian3,
  Color,
  ArcGisMapServerImageryProvider,
} from "cesium";
// import "cesium/Build/Cesium/Cesium";
import icon from "../../assets/location.svg";
import demoCzml from "./demo";
import simple from "./simple";
// @ts-ignore
// import CesiumSensorVolumes from "cesium-sensors/lib/custom/custom-sensor-volume";
import "./index.less";

const CesiumPage = () => {
  const csmViewerRef = useRef<null | Viewer>(null);
  const viewerContainerRef = useRef(null);

  useEffect(() => {
    // const handler = new Cesium.ScreenSpaceEventHandler(
    //   csmViewerRef.current?.scene.canvas
    // );
    // handler.setInputAction((e: any) => {
    //   var pick = csmViewerRef.current?.scene.pick(e.position);
    //   console.log(e, pick);
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }, [csmViewerRef.current]);

  useEffect(() => {
    if (viewerContainerRef.current && !csmViewerRef.current) {
      csmViewerRef.current = new Viewer("csm-viewer-container");
      // console.log(csmViewerRef);

      // 加载不同的地图
      // 使用arcgis map
      csmViewerRef.current.imageryLayers.addImageryProvider(
        new ArcGisMapServerImageryProvider({
          url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
        })
      );

      csmViewerRef.current.dataSources.add(
        Cesium.CzmlDataSource.load(demoCzml)
        // Cesium.CzmlDataSource.load(simple)
      );
      csmViewerRef.current.camera.flyHome(0);
      // csmViewerRef.current.scene.camera.setView({
      //   destination: Cesium.Cartesian3.fromDegrees(-116.52, 35.02, 95000),
      //   orientation: {
      //     heading: 12,
      //   },
      // });

      // 初始化场景位置;
      // csmViewerRef.current.scene.camera.flyTo({
      //   // 初始化相机经纬度
      //   // @ts-ignore
      //   destination: new Cartesian3.fromDegrees(116.39, 39.91, 95000),
      //   orientation: {
      //     heading: 6,
      //     pitch: Math.toRadians(90), //从上往下看为-90
      //     roll: 0,
      //   },
      // });

      // 增加广告牌
      csmViewerRef.current.entities.add({
        position: Cartesian3.fromDegrees(121.54035, 38.92146, 100),
        billboard: {
          image: icon, // default: undefined
          show: true, // default
          pixelOffset: new Cesium.Cartesian2(0, 0), // default: (0, 0)
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
          scale: 1.0, // default: 1.0
          color: Cesium.Color.LIME, // default: WHITE
          rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
          alignedAxis: Cesium.Cartesian3.ZERO, // default
          width: 100, // default: undefined
          height: 25, // default: undefined
        },
      });

      // 在上边添加过的线基础上我们再添加一条动效线
      csmViewerRef.current.entities.add({
        // name:entity.name,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            121.534575, 38.926131, 121.537579, 38.92543, 121.541784, 38.924578,
            121.543973, 38.924144, 121.545947, 38.923944,
          ]),
          width: 2, // 线的宽度，像素为单位
          // @ts-ignore
          // material: new Cesium.PolylineTrailMaterialProperty({
          //   // 尾迹线材质
          //   color: Cesium.Color.GOLD,
          //   trailLength: 0.4,
          //   period: 3.0,
          // }),
        },
      });

      // To create an entity directly
      // var entityCollection = new Cesium.EntityCollection();

      // var entity: any = entityCollection.getOrCreateEntity("test");
      // entity.addProperty("conicSensor");

      // configure other entity properties, e.g. position and orientation...

      // @ts-ignore
      // entity.conicSensor = new CesiumSensorVolumes.ConicSensorGraphics();
      // entity.conicSensor.intersectionColor = new Cesium.ConstantProperty(
      //   new Cesium.Color(0.1, 0.2, 0.3, 0.4)
      // );

      // 多边形及多边体
      csmViewerRef.current.entities.add({
        polygon: {
          // @ts-ignore
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            121.539208, 38.924962, 121.539176, 38.924737, 121.540195, 38.924486,
            121.540281, 38.924737,
          ]),
          extrudedHeight: 50, //
          material: Cesium.Color.RED,
          // closeTop: false,
          // closeBottom: false,
        },
      });
    }
  }, [viewerContainerRef]);

  return (
    <div
      className="csm-viewer-container"
      id="csm-viewer-container"
      ref={viewerContainerRef}
    ></div>
  );
};

export default CesiumPage;
