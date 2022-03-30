<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <key-words :keywords="keywords"></key-words>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComps/childComp";
import { getHomeMultidata } from "network/home";
import RecommendView from "./childComps/recommendView.vue";
import KeyWords from "./childComps/KeyWords.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    KeyWords,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      dKeywords: [],
      keywords: [],
    };
  },
  created() {
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.banner.list;
      this.recommends = res.recommend.list;
      this.dKeywords = res.dKeyword.list;
      this.keywords = res.keywords.list;
    });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>