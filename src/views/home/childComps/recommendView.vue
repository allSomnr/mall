<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0 15px 0;
  border-bottom: 8px solid #eeeeee;
  font-size: 12px;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 75px;
  height: 75px;
  margin-bottom: 4px;
}
</style>