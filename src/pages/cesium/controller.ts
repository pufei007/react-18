import * as Cesium from "cesium";
import {
  Viewer,
  Entity,
  Math,
  Cartesian3,
  Color,
  ArcGisMapServerImageryProvider,
  ScreenSpaceEventHandler,
  CzmlDataSource,
} from "cesium";

class CesiumController {
  public container: any;
  public handle: any;
  public viewer: any;

  constructor(container: any) {
    this.container = container;
    this.init();
  }

  init() {
    let viewer = (this.viewer = new Viewer(this.container, {
      animation: false, // 动画小组件
      baseLayerPicker: false, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
      fullscreenButton: false, // 全屏组件
      vrButton: false, // VR模式
      geocoder: false, // 地理编码（搜索）组件
      homeButton: false, // 首页，点击之后将视图跳转到默认视角
      infoBox: false, // 信息框
      sceneModePicker: false, // 场景模式，切换2D、3D 和 Columbus View (CV) 模式。
      selectionIndicator: false, // 是否显示选取指示器组件
      timeline: true, // 时间轴
      navigationHelpButton: false, // 帮助提示，如何操作数字地球。
      // 如果最初应该看到导航说明，则为true；如果直到用户明确单击该按钮，则该提示不显示，否则为false。
      // navigationInstructionsInitiallyVisible: false,
      // automaticallyTrackDataSourceClocks: true,
      // automaticallyTrackDataSourceClocks,
      // shouldAnimate: true,
    }));

    viewer.scene.skyBox.show = true;

    //去掉版权信息
    // @ts-ignore
    viewer.cesiumWidget.creditContainer.style.display = "none";

    let scene = viewer.scene;
    let camera = viewer.camera;

    viewer.clockViewModel.multiplier = 17;

    viewer.scene.postProcessStages.fxaa.enabled = true; //抗锯齿

    viewer.scene.debugShowFramesPerSecond = true;

    const { height } = scene.globe.ellipsoid.cartesianToCartographic(
      camera.position
    );

    camera.setView({
      destination: Cartesian3.fromDegrees(120, 30, height),
      orientation: {
        heading: Math.toRadians(-13),
        pitch: Math.toRadians(-90),
        roll: 0,
      },
    });

    this.handle = new ScreenSpaceEventHandler(this.viewer.scene.canvas); // 注册事件处理程序
  }

  flyTo = () => {
    //   // csmViewerRef.current.scene.camera.flyTo({
    //   //   // 初始化相机经纬度
    //   //   // @ts-ignore
    //   //   destination: new Cartesian3.fromDegrees(116.39, 39.91, 95000),
    //   //   orientation: {
    //   //     heading: 6,
    //   //     pitch: Math.toRadians(90), //从上往下看为-90
    //   //     roll: 0,
    //   //   },
    //   // });
  };

  // 注册事件
  registerEvent = (fn: any, event: any) => {
    this.handle?.setInputAction(fn, event);
  };

  // 鼠标点击事件监听
  bindRightClick = (callback: any) => {
    this.registerEvent((e: any) => {
      var pick = this.viewer?.scene.pick(e.position);
      console.log(e, pick);
      callback?.(pick);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  };

  // 移除事件
  removeEvent = (event: any) => {
    this.handle?.removeInputAction(event);
  };

  // 加载czml
  loadCzml1 = (czml: any) => {
    // console.log(
    //   "Cesium.CzmlDataSource.load(czml)",
    //   Cesium.CzmlDataSource.load(czml)
    // );
    // console.log(" this.viewer.dataSources", this.viewer.dataSources);
    this.viewer.dataSources.add(CzmlDataSource.load(czml));
  };

  // 加载czml
  loadCzml = (czml: any) => {
    // console.log(
    //   "Cesium.CzmlDataSource.load(czml)",
    //   Cesium.CzmlDataSource.load(czml)
    // );
    // console.log(" this.viewer.dataSources", this.viewer.dataSources);
    // this.viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
    Cesium.CzmlDataSource.load(czml).then((dataSource) => {
      console.log("dataSource", dataSource);
      this.viewer.dataSources.add(dataSource);
      // this.viewer.clock.multiplier = 1;
      // this.viewer.camera.flyHome(0);
      // this.viewer.zoomTo(dataSource);
      this.viewer.flyTo(dataSource);

      var entity = dataSource.entities.getById("Vehicle");
      // if (entity) {
      //   // Track our entity with the camera.
      //   viewer.trackedEntity = entity;
      //   viewer.clock.onTick.addEventListener(function (clock) {
      //     // Get the position of our entity at the current time, if possible (otherwise undefined).
      //     var pos = entity.position.getValue(
      //       clock.currentTime,
      //       scratchCartesian
      //     );
      //     if (pos) {
      //       // If position is valid, convert from Cartesian3 to Cartographic.
      //       var lla = Cesium.Cartographic.fromCartesian(
      //         pos,
      //         Cesium.Ellipsoid.WGS84,
      //         scratchCartographic
      //       );

      //       // Finally, convert from radians to degrees.
      //       toolbar.innerHTML =
      //         "Longitude: " +
      //         Cesium.Math.toDegrees(lla.longitude).toFixed(4) +
      //         " deg\n" +
      //         " Latitude:   " +
      //         Cesium.Math.toDegrees(lla.latitude).toFixed(4) +
      //         " deg\n" +
      //         " Altitude:   " +
      //         Cesium.Math.toDegrees(lla.height).toFixed(4) +
      //         " m";
      //     }
      //   });
      // }
    });
  };

  // 生成实体收集器
  getEntityCollection = (name: string) => {
    let i = this.viewer.dataSources._dataSources.findIndex(
      (item: any) => item.name === name
    );

    if (~i) {
      return this.viewer.dataSources.get(i);
    } else {
      let newCollection = new Cesium.CustomDataSource(name);
      this.viewer.dataSources.ass(newCollection);
      return newCollection;
    }
  };

  // 移除指定实体类
  removeAllEntity = (category: any) => {
    if (category) {
      let dataSource = this.getEntityCollection(category);
      dataSource.entities.removeAll();
    }
  };

  // 移除指定子实体
  removeEntityById = (id: any, category: any) => {
    if (category) {
      let dataSource = this.getEntityCollection(category);
      let exist = dataSource.entities.getById(id);
      if (exist) {
        dataSource.entities.removeEntityById(id);
      }
    }
  };

  // 屏幕坐标转经纬度
  cartesian2ToLonlat = () => {};
  //绘制点
  drawPoint = () => {};
  //绘制线
  drawLine = () => {
    //   csmViewerRef.current.entities.add({
    //     // name:entity.name,
    //     polyline: {
    //       positions: Cesium.Cartesian3.fromDegreesArray([
    //         121.534575, 38.926131, 121.537579, 38.92543, 121.541784, 38.924578,
    //         121.543973, 38.924144, 121.545947, 38.923944,
    //       ]),
    //       width: 2, // 线的宽度，像素为单位
    //       // @ts-ignore
    //       // material: new Cesium.PolylineTrailMaterialProperty({
    //       //   // 尾迹线材质
    //       //   color: Cesium.Color.GOLD,
    //       //   trailLength: 0.4,
    //       //   period: 3.0,
    //       // }),
    //     },
    //   });
  };
  //绘制线
  drawBillboard = () => {
    //   csmViewerRef.current.entities.add({
    //     position: Cartesian3.fromDegrees(121.54035, 38.92146, 100),
    //     billboard: {
    //       image: icon, // default: undefined
    //       show: true, // default
    //       pixelOffset: new Cesium.Cartesian2(0, 0), // default: (0, 0)
    //       eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
    //       horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
    //       verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
    //       scale: 1.0, // default: 1.0
    //       color: Cesium.Color.LIME, // default: WHITE
    //       rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
    //       alignedAxis: Cesium.Cartesian3.ZERO, // default
    //       width: 100, // default: undefined
    //       height: 25, // default: undefined
    //     },
    //   });
  };
  //绘制圆
  drawCircle = () => {};
  // 绘制区域
  drawPolygon = () => {
    //   csmViewerRef.current.entities.add({
    //     polygon: {
    //       // @ts-ignore
    //       hierarchy: Cesium.Cartesian3.fromDegreesArray([
    //         121.539208, 38.924962, 121.539176, 38.924737, 121.540195, 38.924486,
    //         121.540281, 38.924737,
    //       ]),
    //       extrudedHeight: 50, //
    //       material: Cesium.Color.RED,
    //       // closeTop: false,
    //       // closeBottom: false,
    //     },
    //   });
  };
  // 动态绘制
  dynamicDraw = () => {};

  // 地球自转
  icrf = () => {
    if (this.viewer.scene.mode !== Cesium.SceneMode.SCENE3D) {
      return;
    }
    // console.log(this.viewer.camera.position);
    let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(
      this.viewer.clock.currentTime
    );
    if (icrfToFixed) {
      let camera = this.viewer.camera;
      let offset = Cesium.Cartesian3.clone(camera.position);
      let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
      // 偏移相机，否则会场景旋转而地球不转
      camera.lookAtTransform(transform, offset);
    }
  };

  // 绑定事件
  _bindEvent = () => {
    // 转动的速度设置
    this.viewer.clock.multiplier = 15 * 1000;
    // 初始化为单位矩阵
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    this.viewer.scene.postUpdate.addEventListener(this.icrf, this);
  };

  // 解除绑定
  _unbindEvent = () => {
    this.viewer.clock.multiplier = 1;
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    this.viewer.scene.postUpdate.removeEventListener(this.icrf, this);
  };

  // 开始旋转
  start = () => {
    this.viewer.clock.shouldAnimate = true;
    this._unbindEvent();
    this._bindEvent();
    return this;
  };

  // 停止旋转
  stop = () => {
    this._unbindEvent();
    return this;
  };

  // 切换至2d
  transTo2D = (duration: number) => {
    if (!this.viewer) return;
    this.viewer.scene.morphTo2D(duration);
  };

  // 获取模型矩阵
  getModelMatrix = (pointA: any, pointB: any) => {};
  // 获取模型方位角、俯仰角、翻滚角
  getHeadingPitchRoll = (m: any) => {};
  //计算四元数
  calcQuaternion = (ecefs_target: any, ecefs: any, step: number) => {};
}

export default CesiumController;
