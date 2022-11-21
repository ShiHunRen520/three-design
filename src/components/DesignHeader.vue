<template>
  <section class="design-header">
    <p class="design-header-title">THREE---DESIGN设计平台</p>
    <section class="design-header-body">
      <el-button type="primary" plain>
        <el-icon :size="15" color="#2bfbdc"><Edit /></el-icon>
        模型导入
      </el-button>
    </section>
  </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.design-header {
  width: 100%;
  height: 80px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-title {
    // width: 400px;
    line-height: 80px;
    font-size: 18px;
    letter-spacing: 5px;
    -webkit-text-stroke: 1px #02ffff;
    color: transparent;
  }
  &-body {
    width: calc(100% - 350px);
    height: 60px;
    border-radius: 5px;
    // border: 1px dashed #ff9a02;
    display: flex;
    align-items: center;
  }
}
</style>