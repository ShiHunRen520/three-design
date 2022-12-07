<template>
  <section class="design-header">
    <p class="design-header-title">THREE---DESIGN设计平台</p>
    <section class="design-header-body">
      <div style="border: 1px solid #ccc; border-radius: 4px">
        <el-button
          icon="el-icon-document-copy"
          type="primary"
          size="small"
          style="margin-left: 15px"
          @click="checkFile"
          >选择文件</el-button
        >
        <span>{{ fileName }}</span>
        <input
          type="file"
          id="fileinput"
          style="display: none"
          @change="checkFileSure"
        />
      </div>
    </section>
  </section>
</template>

<script setup>
import { Loader } from "three";
import { ref } from "vue";
const fileName = ref();

// 漂亮按钮点击事件
function checkFile () {
  document.querySelector('#fileinput').click()
}
function checkFileSure (e) {
  console.log(e.target?.files[0], 'kkllslls')
  const files = document.querySelector('#fileinput').files;
  const fd = new FormData()
  fd.append('file', files[0])
  fetch("http://localhost:3005/api/upload", {
    method: 'POST',
    body: fd,
  }).then(res => {
    if (res.ok) {
      console.log('success')
      return res.json()
    } else {
      console.log('error')
    }
  }).then(res => {
    console.log('res is', res)
  })
}
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