<template>
  <div>
    <div class="title">本周流行</div>
    <div class="keywords">
      <div v-for="(item, index) in keywords" :key="index" class="keywordlist">
        <a :href="item.link">
          <img :src="item.image" alt="" />
          <div>{{ item.title }}</div>
        </a>
      </div>
      <div
        v-for="(item, index) in keywords"
        :key="index + 4"
        class="keywordlist"
      >
        <a :href="item.link">
          <img :src="item.image" alt="" />
          <div>{{ item.title }}</div>
        </a>
      </div>
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
.title {
  text-align: center;
  padding: 17px 0 8px 0;
  font-size: 20px;
  font-weight: bold;
}
.keywords {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  font-size: 15px;
  margin-bottom: 15px;
}
.keywordlist img {
  height: 75px;
  width: 75px;
  margin: 10px 5px 5px 5px;
  flex: 1;
}
.keywordlist div {
  margin-bottom: 10px;
}
</style>