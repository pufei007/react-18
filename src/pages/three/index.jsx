import React, { useState, useEffect } from "react";
// import { FontLoader } from "three/addons/loaders/FontLoader.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

function index() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  let scene, camera, renderer, controls; // 场景，相机，渲染器，控制器
  let donuts; //后面甜甜圈旋转时的变量
  let mixer; // 甜甜圈播放动画是的变量

  const resizeUpdate = (e) => {
    // 通过事件对象获取浏览器窗口的高度
    let h = e.target.innerHeight;
    let w = e.target.innerWidth;
    // 对应用大小进行重置
    renderer.setSize(w, h);
    setHeight(h);
    setWidth(w);
  };
  // 重置窗口大小
  useEffect(() => {
    // 页面刚加载完成后获取浏览器窗口的大小
    let h = window.innerHeight;
    setHeight(h);
    let w = window.innerWidth;
    setWidth(w);
    // 页面变化时获取浏览器窗口的大小
    window.addEventListener("resize", resizeUpdate);
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener("resize", resizeUpdate);
    };
  }, []);

  useEffect(() => {
    // 创建场景
    scene = new THREE.Scene();
    // // 创建相机
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height); //设置渲染器尺寸
    document.getElementById("container").appendChild(renderer.domElement);

    camera.position.set(0.3, 0.3, 0.5); // 设置相机位置

    controls = new OrbitControls(camera, renderer.domElement);
    const directionLight = new THREE.DirectionalLight(0xffffff, 0.4); //添加平行光
    scene.add(directionLight);

    gltfLoader(); // 场景添加glb文件
    rgbeLoader(); // 添加背景天空
    animate(); // 动画循环

    // 组件销毁时移除app应用
    return () => {
      document.getElementById("container").removeChild(renderer.domElement);
    };
  }, []);

  const gltfLoader = () => {
    new GLTFLoader().load("../src/resources/models/donuts.glb", (gltf) => {
      scene.add(gltf.scene);
      donuts = gltf.scene;

      mixer = new THREE.AnimationMixer(gltf.scene);
      const clips = gltf.animations; // 播放所有动画
      clips.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.loop = THREE.LoopOnce;
        // 停在最后一帧
        action.clampWhenFinished = true;
        action.play();
      });
    });
  };

  const rgbeLoader = () => {
    new RGBELoader().load("../src/resources/sky2.hdr", function (texture) {
      scene.background = texture;
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.render(scene, camera);
    });
  };

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    if (donuts) {
      donuts.rotation.y += 0.01;
    }
    if (mixer) {
      mixer.update(0.02);
    }
  };

  return <div id="container" style={{ width: width, height: height }}></div>;
}

export default index;
