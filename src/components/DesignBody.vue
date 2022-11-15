<template>
  <section class="design-body">
    <div id="scene" ref="scene"></div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Hscene from '../utils/Hscene';
import { usePostProcessing } from '../utils/usePostProcessing';
import {
  Mesh, MeshPhongMaterial, BoxGeometry, AmbientLight, GridHelper
} from 'three';
import * as THREE from 'three';
const scene = ref();
let T, composerer, outlinePasser;
let selectedObjects = [];

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
};
const render = () => {
  // T.renderer.render(T.scene, T.camera);
  composerer.render();
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
  group.add(box, line)
  return group;
};

const addSelectedObject = obj => {
  selectedObjects = [];
  selectedObjects.push(obj);
}


</script>

<style lang="scss" scoped>
.design-body {
  width: calc(100% - 650px);
  height: 100%;
  border-radius: 5px;
  border: 1px dashed #00ffc8;
  #scene {
    width: 100%;
    height: 100%;
  }
}
</style>