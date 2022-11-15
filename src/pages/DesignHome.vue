<template>
  <section class="design-home">
    <DesignHeader />
    <div class="design-home-container">
      <DesignSide />
      <DesignBody />
    </div>
  </section>
</template>

<script setup>
import DesignHeader from '../components/DesignHeader.vue';
import DesignSide from '../components/DesignSide.vue';
import DesignBody from '../components/DesignBody.vue'
</script>

<style lang="scss" scoped>
.design-home {
  width: 100%;
  height: 100%;
  background: rgb(26, 99, 117);
  &-container {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    padding: 10px;
  }
}
</style>