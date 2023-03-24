import * as Cesium from "cesium";

class CesiumEarth {
  constructor(containerId) {
    this.viewer = new Cesium.Viewer(containerId);
  }

  // 绘制线段
  drawLine(start, end) {
    const line = this.viewer.entities.add({
      polyline: {
        positions: [start, end],
        width: 3,
        material: Cesium.Color.RED,
      },
    });
    return line;
  }

  // 绘制圆形灯
  drawCircle(center, radius) {
    const circle = this.viewer.entities.add({
      position: center,
      ellipse: {
        semiMinorAxis: radius,
        semiMajorAxis: radius,
        height: 0,
        material: Cesium.Color.BLUE.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
    });
    return circle;
  }

  // 测距
  measureDistance(start, end) {
    const distance = Cesium.Cartesian3.distance(start, end);
    return distance;
  }
}

export default CesiumEarth;
