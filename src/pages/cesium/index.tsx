import React, { Component } from "react";
import * as Cesium from "cesium";
// import "cesium/Widgets/widgets.css";

class SatelliteBeam extends Component {
  componentDidMount() {
    // 创建Cesium Viewer
    const viewer = new Cesium.Viewer("cesiumContainer"); // 'cesiumContainer' 是用于放置Cesium的HTML元素的ID

    // // 定义卫星1和卫星2的位置坐标（经度、纬度和高度）
    // const satellite1Position = Cesium.Cartesian3.fromDegrees(
    //   -75.0,
    //   40.0,
    //   788888888
    // );
    // const satellite2Position = Cesium.Cartesian3.fromDegrees(
    //   6.0,
    //   49.0,
    //   666666666.0
    // );

    // // 创建波束的图形
    // viewer.entities.add({
    //   polyline: {
    //     positions: [satellite1Position, satellite2Position],
    //     width: 5, // 波束的宽度
    //     material: Cesium.Color.RED, // 波束的颜色
    //     arcType: Cesium.ArcType.NONE, // 确保路径是直线而不是弧线
    //   },
    // });

    // 计算波束的方向
    // const direction = Cesium.Cartesian3.subtract(
    //   satellite2Position,
    //   satellite1Position,
    //   new Cesium.Cartesian3()
    // );
    // Cesium.Cartesian3.normalize(direction, direction);
    // // 创建波束的路径（圆锥形）
    // const beamPath = viewer.entities.add({
    //   corridor: {
    //     positions: [satellite1Position, satellite2Position],
    //     width: 2000, // 波束的初始宽度
    //     material: new Cesium.PolylineDashMaterialProperty({
    //       color: Cesium.Color.RED, // 波束的颜色
    //     }),
    //   },
    // });

    // // 创建波束的体积
    // const beamVolume = viewer.entities.add({
    //   polylineVolume: {
    //     positions: [satellite1Position, satellite2Position],
    //     shape: [new Cesium.Cartesian2(0, 0), new Cesium.Cartesian2(5000, 5000)], // 波束的形状，可以根据需要调整大小
    //     cornerType: Cesium.CornerType.MITERED,
    //     material: Cesium.Color.RED, // 波束的颜色
    //   },
    // });

    // // 计算波束方向的角度
    // const hpr = new Cesium.HeadingPitchRoll();
    // Cesium.Matrix4.getRotation(beamVolume.modelMatrix, hpr);
    // const angle = hpr.heading;

    // // 调整波束的方向
    // beamVolume.orientation = Cesium.Matrix4.fromRotationTranslation(
    //   Cesium.Matrix3.fromRotationZ(angle + Math.PI / 2),
    //   satellite1Position
    // );

    // 旋转波束，使其与方向一致
    // const rotationMatrix = Cesium.Matrix3.fromRotationZ(
    //   Math.PI / 2 -
    //     Math.acos(Cesium.Cartesian3.dot(Cesium.Cartesian3.UNIT_X, direction))
    // );

    // beamVolume.orientation = Cesium.Matrix4.fromRotationTranslation(
    //   rotationMatrix,
    //   satellite1Position
    // );

    // // 动态调整波束宽度，使其逐渐扩散
    // viewer.clock.onTick.addEventListener(function () {
    //   const currentTime = viewer.clock.currentTime;
    //   const elapsedTime = Cesium.JulianDate.secondsDifference(
    //     currentTime,
    //     viewer.clock.startTime
    //   );

    //   // 根据时间调整波束宽度，以模拟扩散
    //   beamPath.corridor.width = 2000 + elapsedTime * 50; // 调整扩散速度
    // });

    // const beamShape = new Cesium.PolylineGeometry({
    //   positions: [satellite1Position, satellite2Position],
    //   width: 1000, // 波束的宽度
    // });

    // // 创建波束的外观
    // const beamAppearance = new Cesium.MaterialAppearance({
    //   material: Cesium.Material.fromType("Color", {
    //     color: Cesium.Color.RED.withAlpha(1), // 波束的颜色和透明度
    //   }),
    // });

    // // 创建波束的几何实例
    // const beamGeometryInstance = new Cesium.GeometryInstance({
    //   geometry: beamShape,
    //   modelMatrix: Cesium.Matrix4.IDENTITY,
    //   attributes: {
    //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(
    //       Cesium.Color.RED
    //     ),
    //   },
    // });

    // // 创建波束的Primitive
    // const beamPrimitive = new Cesium.Primitive({
    //   geometryInstances: [beamGeometryInstance],
    //   appearance: beamAppearance,
    // });

    // // 添加波束到场景
    // viewer.scene.primitives.add(beamPrimitive);

    // // 定义卫星1和卫星2的位置坐标（经度、纬度和高度）
    // const satellite1Position = Cesium.Cartesian3.fromDegrees(-75.0, 40.0, 0.0);
    // const satellite2Position = Cesium.Cartesian3.fromDegrees(-74.0, 41.0, 0.0);

    // // 创建自定义着色器程序
    // const beamShader = `
    //   attribute vec3 position;
    //   uniform mat4 u_modelViewProjection;
    //   void main() {
    //     gl_Position = u_modelViewProjection * vec4(position, 1.0);
    //   }
    // `;

    // // 创建着色器程序的材质
    // const beamMaterial = new Cesium.Material({
    //   fabric: {
    //     source: beamShader,
    //     uniforms: {
    //       color: new Cesium.Color(1.0, 0.0, 0.0, 0.3), // 波束的颜色和透明度
    //     },
    //   },
    // });

    // // 创建波束的几何
    // const beamGeometry = new Cesium.Geometry({
    //   attributes: new Cesium.GeometryAttributes({
    //     position: new Cesium.GeometryAttribute({
    //       componentDatatype: Cesium.ComponentDatatype.FLOAT,
    //       componentsPerAttribute: 3,
    //       values: new Float32Array([
    //         satellite1Position.x,
    //         satellite1Position.y,
    //         satellite1Position.z,
    //         satellite2Position.x,
    //         satellite2Position.y,
    //         satellite2Position.z,
    //       ]),
    //     }),
    //   }),
    //   primitiveType: Cesium.PrimitiveType.LINES,
    //   boundingSphere: new Cesium.BoundingSphere(
    //     Cesium.Cartesian3.ZERO,
    //     1000000.0
    //   ),
    // });

    // Cesium.defineProperties(beamGeometry, {
    //   _workerName: "RadarBeamGeometry", // 这里使用了自定义的_workerName，你可以根据需要自定义
    // });

    // // 创建波束的Primitive
    // const beamPrimitive = new Cesium.Primitive({
    //   geometryInstances: new Cesium.GeometryInstance({
    //     geometry: beamGeometry,
    //     modelMatrix: Cesium.Matrix4.IDENTITY,
    //     attributes: {},
    //   }),
    //   appearance: new Cesium.Appearance({
    //     material: beamMaterial,
    //     renderState: {
    //       depthTest: {
    //         enabled: true,
    //       },
    //       lineWidth: 2.0, // 波束的宽度
    //     },
    //   }),
    // });

    // // 添加波束到场景
    // viewer.scene.primitives.add(beamPrimitive);

    // 定义星1和星2的位置坐标（太空中的位置，可以是任何合理的值）
    // const star1Position = new Cesium.Cartesian3(0, 0, 1000000.0); // 举例：位于太空中的位置
    // const star2Position = new Cesium.Cartesian3(1000000.0, 0, 0); // 举例：位于太空中的位置

    const star1Position = Cesium.Cartesian3.fromDegrees(-75.0, 40.0, 7898888);
    const star2Position = Cesium.Cartesian3.fromDegrees(-90, 40.0, 7898888.0);
    // const star1Position = new Cesium.Cartesian3(
    //   -14516939.0194339,
    //   -3368384.25750661,
    //   30226792.3721741
    // );

    // const star2Position = new Cesium.Cartesian3(
    //   4650397.56551457,
    //   -3390535.52275848,
    //   -4087729.48877329
    // );

    // 计算朝向向量，将圆锥体朝向卫星2
    const directionVector = Cesium.Cartesian3.normalize(
      Cesium.Cartesian3.subtract(
        star2Position,
        star1Position,
        new Cesium.Cartesian3()
      ),
      new Cesium.Cartesian3()
    );

    // 创建圆锥体表示波束
    const coneEntity = viewer.entities.add({
      position: star1Position,
      cylinder: {
        // direction: directionVector,
        length: Cesium.Cartesian3.distance(star1Position, star2Position), // 圆锥体的长度
        topRadius: 0.0, // 顶部半径（设置为0表示圆锥体）
        bottomRadius: 1000000.0, // 底部半径（根据需要调整）
        material: Cesium.Color.RED.withAlpha(1), // 波束的颜色和透明度
        outline: true, // 是否绘制轮廓线
        outlineColor: Cesium.Color.BLACK, // 轮廓线的颜色
        outlineWidth: 2.0, // 轮廓线的宽度
      },
    });
    // 朝向调整 十分关键有效
    // 计算旋转四元数，将一个向量旋转到另一个向量的方向
    // function calculateRotationQuaternion(fromVector, toVector) {
    //   const axis = new Cesium.Cartesian3();
    //   Cesium.Cartesian3.cross(fromVector, toVector, axis);
    //   const angle = Cesium.Cartesian3.angleBetween(fromVector, toVector);

    //   const halfAngle = angle / 2.0;
    //   const sinHalfAngle = Math.sin(halfAngle);

    //   const quaternion = new Cesium.Quaternion();
    //   quaternion.x = axis.x * sinHalfAngle;
    //   quaternion.y = axis.y * sinHalfAngle;
    //   quaternion.z = axis.z * sinHalfAngle;
    //   quaternion.w = Math.cos(halfAngle);

    //   return quaternion;
    // }

    // 计算旋转矩阵以将圆锥体朝向卫星2
    // const rotationMatrix = Cesium.Transforms.rotationMatrix(
    //   satellite1Position,
    //   directionVector
    // );
    // const currentTime = Cesium.JulianDate.now();

    // const rotationMatrix =
    //   Cesium.Transforms.computeFixedToIcrfMatrix(currentTime);
    // const orientationQuaternion =
    //   Cesium.Quaternion.fromRotationMatrix(rotationMatrix);

    // // 创建 Property 来设置方向
    // const orientationProperty = new Cesium.ConstantProperty(
    //   orientationQuaternion
    // );

    // 创建一个 Property 来设置方向
    const orientationProperty = new Cesium.CallbackProperty((time, result) => {
      // 获取当前时间的儒略日期
      const currentTime = Cesium.JulianDate.now();

      // 计算旋转矩阵以将圆锥体朝向卫星2
      const rotationMatrix =
        Cesium.Transforms.computeFixedToIcrfMatrix(currentTime);

      // 创建四元数表示旋转
      const orientationQuaternion =
        Cesium.Quaternion.fromRotationMatrix(rotationMatrix);

      // 返回四元数
      return orientationQuaternion;
    }, false);

    // 将方向 Property 设置为实体的方向
    coneEntity.orientation = orientationProperty;
  }

  render() {
    return (
      <div>
        <div
          id="cesiumContainer"
          style={{ width: "100%", height: "100vh" }}
        ></div>
      </div>
    );
  }
}

export default SatelliteBeam;
