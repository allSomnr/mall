<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <key-words :keywords="recommends"></key-words>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tab-click="tabClick"
    ></tab-control>
    <goods-list :goods="ShowList"></goods-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComps/childComp";
import RecommendView from "./childComps/recommendView.vue";
import KeyWords from "./childComps/KeyWords.vue";
import TabControl from "components/content/TabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    KeyWords,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      dKeywords: [],
      keywords: [],
      goods: {
        pop: { page: 0, list: [], type: "pop" },
        new: { page: 0, list: [], type: "new" },
        sell: { page: 0, list: [], type: "sell" },
      },
      currentType: "pop",
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    ShowList() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //
    //
    // 事件监听👇
    //
    //
    //
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    //
    //
    // 网络请求👇
    //
    //
    //

    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.banner.list;
        this.recommends = res.recommend.list;
        this.dKeywords = res.dKeyword.list;
        this.keywords = res.keywords.list;
      });
    },
    getHomeGoods(type) {
      const page = (this.goods[type].page += 1);
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.list);
      });
    },
  },
};
</script>

<style>
body {
  padding-top: 44px;
  padding-bottom: 49px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>