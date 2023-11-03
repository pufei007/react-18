import * as React from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Tile, Graticule, Heatmap, WebGLPoints } from "ol/layer";
import { XYZ, Vector } from "ol/source";
import { Stroke, Style, Fill, Circle } from "ol/style";
import { fromLonLat } from "ol/proj";
import { defaults, Draw, Pointer } from "ol/interaction";
import { KML, GeoJSON } from "ol/format";
import Overlay from "ol/Overlay";
import "./index.less";

const { useState, useEffect } = React;

const index = () => {
  useEffect(() => {
    console.log("2 :>> ", 2);
    const map = new Map({
      // 最大加载图层数量
      maxTilesLoading: 50,
      // 分辨率
      pixelRatio: window.devicePixelRatio,
      //禁止双击放大事件
      interactions: defaults({ doubleClickZoom: false }),
      // 设置挂载
      target: "map",
      //图层
      layers: [
        new Tile({
          source: new XYZ({
            url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      // 地图可视区域，center为中心点 zoom为缩放级别
      view: new View({
        center: fromLonLat([104, 30]),
        zoom: 5,
      }),
      // 控制按钮 设置为空则清除默认按钮
      controls: [],
    });

    // 图层
    // const layerTile = new Tile({
    //   source: new XYZ({
    //     url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    //   }),
    // });
    // // 视图
    // const view = new View({
    //   center: fromLonLat([37.41, 8.82]),
    //   zoom: 4,
    // });

    // map.setView(view);
    // map.setLayerGroup(layerTile);

    //为坐标系渲染网格的层（目前仅支持 EPSG:4326）。请注意，视图投影必须同时定义范围和世界范围。
    // const gra = new Graticule({
    //   strokeStyle: new Stroke({
    //     color: "rgba(255,120,0,0.9)",
    //     width: 2,
    //     lineDash: [0.5, 4],
    //   }),
    //   showLabels: true,
    //   wrapX: false,
    // });

    // map.addLayer(gra);

    // 用于将矢量数据渲染为热图的层。
    // const heatmap = new Heatmap({
    //   source: new Vector({
    //     url: "https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml",
    //     format: new KML({
    //       extractStyles: false,
    //     }),
    //   }),
    //   blur: 5,
    //   radius: 2,
    // });

    // map.addLayer(heatmap);

    //矢量图层是用来渲染矢量数据的图层类型，一般用于绘制区域覆盖层。
    const source = new Vector({
      url: "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
      format: new GeoJSON(),
    });

    // const vectorLayer = new Vector({
    //   //初始化矢量图层
    //   source: source,
    //   style: new Style({
    //     stroke: new Stroke({
    //       //线样式
    //       color: "#ffcc33",
    //       width: 2,
    //     }),
    //   }),
    // });
    // map.addLayer(vectorLayer);

    /**
     *当数据量大的时候，我们需要在图层上绘制点。使用WebGLPoint能大量提升性能。
      WebGLPoint Layer(层) 是由 WebGL 作为渲染引擎的点图层，众所周知，WebGL在渲染大量数据（>10k）效率明显优于Canvas或SVG，所以对于有大数据量前端渲染需求的，WebGL作为渲染引擎几乎是唯一的选择。
     */
    // const vectorSource = new Vector({
    //   url: "https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson",
    //   format: new GeoJSON(),
    // });
    // let pointLayer = new WebGLPoints({
    //   source: vectorSource,
    //   style: {
    //     symbol: {
    //       symbolType: "circle",
    //       size: [
    //         "interpolate",
    //         ["linear"],
    //         ["get", "population"],
    //         40000,
    //         8,
    //         2000000,
    //         28,
    //       ],
    //       color: "#006688",
    //       rotateWithView: false,
    //       offset: [0, 0],
    //       opacity: [
    //         "interpolate",
    //         ["linear"],
    //         ["get", "population"],
    //         40000,
    //         0.6,
    //         2000000,
    //         0.92,
    //       ],
    //     },
    //   },
    // });

    // map.addLayer(pointLayer);

    // Draw 使用 负责勾绘交互，支持绘制的图形类型包含 Point（点）、LineString（线）、Polygon（面）和Circle（圆）。
    // var draw = new Draw({
    //   source: source,
    //   type: "Polygon",
    //   style: new Style({
    //     fill: new Fill({
    //       color: "rgba(255, 255, 255, 1)",
    //     }),
    //     stroke: new Stroke({
    //       color: "#ffcc33",
    //       width: 2,
    //     }),
    //     image: new Circle({
    //       radius: 7,
    //       fill: new Fill({
    //         color: "#ffcc33",
    //       }),
    //     }),
    //   }),
    // });
    // map.addInteraction(draw);

    // pointer 监听鼠标的行为按下（Down）、移动（Move(举动)）和抬起（Up）事件。
    // var pointer = new Pointer({
    //   handleDownEvent: (e: any) => {
    //     console.log("按下", e.type);
    //     return true;
    //   },
    //   handleDragEvent: (e: any) => {
    //     console.log("拖拽移动", e.type);
    //   },
    //   handleUpEvent: (e: any) => {
    //     console.log("拖拽抬起", e.type);
    //     return false;
    //   },
    // });
    // map.addInteraction(pointer);

    setTimeout(() => {
      // console.log(
      //   'document.getElementById("tag") :>> ',
      //   document.getElementById("tag")
      // );
      // const tag = new Overlay({
      //   position: fromLonLat([0, 0]),
      //   positioning: "center-center",
      //   offset: [15, 15],
      //   element: document.getElementById("tag") as HTMLElement,
      //   autoPan: true,
      //   // autoPanAnimation: {
      //   //   duration: 250,
      //   // },
      //   // stopEvent: false,
      // });
      // map.addOverlay(tag);

      // 创建一个overlay
      const overlay = new Overlay({
        element: document.getElementById("popup") as HTMLElement, // 这是你在 JSX 中创建的 div 元素的 id
        autoPan: true,
        // autoPanAnimation: {
        //   duration: 250,
        // },
      });

      map.addOverlay(overlay);

      // 在地图上添加一个标记，并在点击时显示overlay
      const marker = new Overlay({
        position: fromLonLat([0, 0]), // 设置标记位置
        element: document.getElementById("marker") as HTMLElement, // 这是你在 JSX 中创建的 div 元素的 id
      });

      map.addOverlay(marker);

      marker.getElement()?.addEventListener("click", () => {
        overlay.setPosition(marker.getPosition());
      });
    }, 1000);
  }, []);

  // useEffect(()=>{
  //   if(document.getElementById("tag")){
  //     const tag = new Overlay({
  //       position: fromLonLat([120.41, 28.82]),
  //       positioning: "center-center",
  //       element: document.getElementById("tag") as HTMLElement,
  //       stopEvent: false,
  //     });
  //     map.addOverlay(tag);
  //   }
  // },[
  //   document.getElementById("tag")
  // ])

  return (
    <div>
      <div
        id="map"
        className="map"
        style={{ width: "100vw", height: "100vh" }}
      />
      <div
        id="tag"
        className="tag"
        style={{
          background: "pink",
          width: "100px",
          height: "100px",
          zIndex: 10000,
        }}
      >
        444444
      </div>
      <div
        id="popup"
        className="ol-popup"
        style={{
          background: "pink",
          width: "100px",
          height: "100px",
          zIndex: 10000,
        }}
      >
        {/* 这里放置overlay的内容 */}
        This is a popup.
      </div>
      <div
        id="marker"
        className="marker"
        style={{
          background: "pink",
          width: "100px",
          height: "100px",
          zIndex: 10000,
        }}
      >
        {/* 这里放置标记的内容 */}
        Click me.
      </div>
    </div>
  );
};

export default index;
