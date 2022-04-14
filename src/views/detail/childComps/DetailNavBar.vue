<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" id="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" id="center">
        <li
          v-for="(item, index) in titles"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </li>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("title-click", index);
    },
    backClick() {
      this.$router.back();
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
#left {
  font-size: 30px;
}
#center {
  display: flex;
}
#center li {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>