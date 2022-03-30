<template>
  <div class="keywords">
    <div v-for="(item, index) in keywords" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyWords",
  props: {
    keywords: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
</style>