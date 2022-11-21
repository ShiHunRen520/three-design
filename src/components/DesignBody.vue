<template>
  <section class="design-body">
    <div id="scene" ref="scene"></div>
    <div class="design-body-view">视图</div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Hscene from '../utils/Hscene';
import { usePostProcessing } from '../utils/usePostProcessing';
import {
  Mesh, MeshPhongMaterial, BoxGeometry, AmbientLight, GridHelper, Clock
} from 'three';
import { ViewHelper } from '../utils/ViewHelper';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
const scene = ref();
let T, composerer, outlinePasser;
let selectedObjects = [];
let dragObjects = [];
let viewHelper = null;
const clock = new Clock();
onMounted(() => {
  initScene();
  render();
});
const initScene = () => {
  T = new Hscene({
    container: scene.value,
    controls: { open: true, enableDamping: true },
  });
  const grid = new GridHelper(88, 88, 88);
  grid.receiveShadow = true;
  T.scene.add(grid);
  T.camera.position.z = 100;
  T.camera.position.y = 20;
  viewHelper = new ViewHelper(T.camera, scene.value);
  viewHelper.controls = T.controls;
  let { composer, outlinePass } = usePostProcessing({
    visibleEdgeColor: '#00fee9',
    hiddenEdgeColor: '#FFFFFF',
    container: scene.value,
    T
  });
  composerer = composer;
  outlinePasser = outlinePass;
  initLight();
  scene.value.addEventListener('click', raySelect, false);
  createManyBox();
  initDragTransformControls();
};
const render = () => {
  T.renderer.clear()
  const delta = clock.getDelta();
  if (viewHelper.animating === true) {
    viewHelper.update(delta);
  }
  // T.renderer.render(T.scene, T.camera);
  composerer.render();
  viewHelper ? viewHelper.render(T.renderer) : '';
  requestAnimationFrame(render);
};
const initLight = () => {
  const ambientLight = new AmbientLight(0xffffff);
  const light = new THREE.DirectionalLight(0xddffdd, 0.6);
  light.position.set(50, 80, 10);
  T.scene.add(ambientLight, light);
};
const raySelect = (e) => {
  let mouse = new THREE.Vector2()
  let raycaster = new THREE.Raycaster()
  mouse.x = ((e.clientX - scene.value.getBoundingClientRect().left) / scene.value.offsetWidth) * 2 - 1
  mouse.y = -((e.clientY - scene.value.getBoundingClientRect().top) / scene.value.offsetHeight) * 2 + 1
  raycaster.setFromCamera(mouse, T.camera);
  let intersects = raycaster.intersectObjects(T.scene.children);
  if (intersects.length > 0) {
    let intersected = intersects[0]
    console.log(intersected.object);
    addSelectedObject(intersected.object);
    outlinePasser.selectedObjects = selectedObjects;
  }
};
const createManyBox = () => {
  let boxGroup = new THREE.Group();
  for (let i = 0; i < 50; i++) {
    const pos = new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 100);
    const box = addBox();
    box.position.copy(pos);
    boxGroup.add(box);
  }
  T.scene.add(boxGroup);
};
const addBox = () => {
  const geo = new BoxGeometry(5, 5, 5);
  const mat = new MeshPhongMaterial({
    color: 0xa8451c,
    wireframe: false,
    transparent: true,
    opacity: 0.5
  });
  let edges = new THREE.EdgesGeometry(geo, 89);//大于度才添加线条
  let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x888888 }));
  let box = new Mesh(geo, mat);
  let group = new THREE.Object3D();
  group.add(box)
  dragObjects.push(group);  // 可以拖拽的数组
  return group;
};
const dragControlsRender = () => {
  T.renderer.render(T.scene, T.camera);
}
const addSelectedObject = obj => {
  selectedObjects = [];
  selectedObjects.push(obj);
};
const initDragTransformControls = () => {
  var dragControls = new DragControls(dragObjects, T.camera, T.renderer.domElement);
  // 鼠标略过事件
  dragControls.addEventListener('hoveron', function (event) {
    console.log("createDragControls hoveron", event);
    // 让变换控件对象和选中的对象绑定
  });
  // 开始拖拽
  dragControls.addEventListener('dragstart', function (event) {
    console.log("createDragControls dragstart");
    T.controls.enabled = false;
  });
  // 拖拽过程
  dragControls.addEventListener('drag', function (event) {
    console.log("createDragControls drag");
    dragControlsRender();
  });
  // 拖拽结束
  dragControls.addEventListener('dragend', function (event) {
    console.log("createDragControls dragend");
    T.controls.enabled = true;
  });
}

</script>

<style lang="scss" scoped>
.design-body {
  width: calc(100% - 650px);
  height: 100%;
  position: relative;
  border-radius: 5px;
  border: 1px dashed #00ffc8;
  #scene {
    width: 100%;
    height: 100%;
  }
  &-view {
    position: absolute;
    top: 20px;
    right: 0px;
    width: 50px;
    height: 50px;
    border-radius: 25px 0 0 25px;
    border: 1px solid #ffea00;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    -webkit-text-stroke: 1px #00eeff;
    color: transparent;
  }
  &-view:hover {
    transition: all 5s ease-in;
    border-radius: 50% 0 0 50%;
    border: 1px dashed #00ff26;
  }
}
</style>