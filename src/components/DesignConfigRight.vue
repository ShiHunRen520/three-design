<template>
  <section class="design-config-side">
    <div class="design-config-side-title">
      <el-icon :size="20" color="#94e792"><Setting /></el-icon>
      配置库
      <el-icon :size="20" color="#94e792"><Notebook /></el-icon>
    </div>
    <div class="design-config-side-body"></div>
  </section>
</template>
  <script setup>
import { onMounted, reactive } from "vue";


const materialList = reactive([]);
onMounted(() => {
  initMaterial()
});
const initMaterial = () => {
  for (let i = 0; i < 10; i++) {
    materialList.push({
      name: `物料${i}`,
      icon: '',
    })
  }
}
  </script>
  <style scoped lang="scss">
.design-config-side {
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // padding: 0 0 10px 0;
  // border: 1px solid red;
  &-title {
    width: 90%;
    height: 60px;
    border-radius: 8px;
    border: 1px dashed #0095ff;
    padding: 0 50px;
    font-size: 18px;
    font-weight: 500;
    font-family: "Times New Roman", Times, serif;
    letter-spacing: 10px;
    -webkit-text-stroke: 1px #d4ff00;
    color: transparent;
    text-align: center;
    // margin-top: 10px;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  &-body {
    width: 90%;
    height: calc(100% - 80px);
    border-radius: 5px;
    border: 1px dashed #d0ff00;
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    &-material {
      width: 45%;
      height: 45px;
      border-radius: 5px;
      border: 1px solid #00ff77;
      text-align: center;
      line-height: 45px;
      color: #00ddff;
    }
    &-material:hover {
      cursor: pointer;
      transition: all 1s;
      border: 1px dashed #00ddff;
      color: #00ff77;
    }
  }
}
</style>
  