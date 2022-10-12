const simple = [
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
        0, -70, 20, 150000, 100, -80, 44, 150000, 200, -90, 18, 150000, 300,
        -98, 52, 150000,
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
export default simple;
