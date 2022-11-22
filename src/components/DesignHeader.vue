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
function checkFileSure (val) {
  console.log(document.querySelector('#fileinput').files[0])
  const files = document.querySelector('#fileinput').files;
  let rootFile, rootPath;
  if (!files.length) return;
  const fileMap = new Map();
  Array.from(files).forEach(file => fileMap.set(file.name, file));
  Array.from(fileMap).forEach(([path, file]) => {
    if (file.name.match(/\.(gltf|glb)$/)) {
      rootFile = file;
      rootPath = path.replace(file.name, "");
    }
  });
  const fileUrl = URL.createObjectURL(rootFile);
  console.log(fileUrl, 'Model path');
  // localStorage.setItem('modelUrl', fileUrl);
  const index = fileUrl.lastIndexOf("/");
  const baseURL = index === -1 ? "./" : fileUrl.substr(0, index + 1);
  const normalizedURL =
    rootPath +
    decodeURI(fileUrl)
      .replace(baseURL, "")
      .replace(/^(\.?\/)/, "");
  fileMap.set("normalizedURL", normalizedURL)
  console.log(fileMap, 'lllllllllllll')
  if (fileMap.has(normalizedURL)) {
    const blob = fileMap.get(normalizedURL);
    const blobURL = URL.createObjectURL(blob);
    // blobURLs.push(blobURL);
    console.log(blobURL, 'aiiiiiiijjjjjjjjjjjjj');
  }
  // this.fileName = document.querySelector('#fileinput').files[0].name
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