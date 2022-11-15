<template>
  <section class="design-side">
    <div class="design-side-title">
      <el-icon :size="30" color="#b39be7"><FolderChecked /></el-icon>
      物料库
      <el-icon :size="30" color="#b39be7"><ForkSpoon /></el-icon>
    </div>
    <div class="design-side-body"></div>
  </section>
</template>
<script setup>

</script>
<style scoped lang="scss">
.design-side {
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
    border: 1px dashed #00ffc8;
    padding: 0 50px;
    font-size: 25px;
    font-weight: 500;
    font-family: "Times New Roman", Times, serif;
    letter-spacing: 10px;
    -webkit-text-stroke: 1px #00aaff;
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
    border: 1px dashed #00ffc8;
  }
}
</style>
