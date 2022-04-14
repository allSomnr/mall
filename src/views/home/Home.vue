<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tab-click="tabClick"
      ref="tabControl1"
      :class="{ fixed: isTabFixed }"
      v-show="isTabFixed"
    ></tab-control>
    <b-scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullUpLoad="pullUpLoad"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <key-words :keywords="recommends"></key-words>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tab-click="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="ShowList"></goods-list>
    </b-scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "./childComps/recommendView.vue";
import KeyWords from "./childComps/KeyWords.vue";
import TabControl from "components/content/TabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BScroll from "components/common/bscroll/Scroll.vue";
import BackTop from "components/content/backTop/backTop.vue";
// 防抖函数
import { itemListenerMixin } from "common/mixin.js";

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
    BScroll,
    BackTop,
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
      isShowBackTop: false,
      isTabFixed: false,
      saveY: 0,
      isUpdate: 0,
    };
  },
  created() {
    // 调用methods里的网络请求数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mixins: [itemListenerMixin],
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$emit("DetailIsUpdata");
  },
  computed: {
    ShowList() {
      //获取要显示的列表
      return this.goods[this.currentType].list;
    },
  },
  // destroyed() {
  //   // console.log("Homedestroyed");
  // },

  methods: {
    //
    //
    // 事件监听👇
    //
    //
    //选择tab-control点击显现的数据传值
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部按钮的按钮显现
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000;
      this.isTabFixed = position.y < -this.$refs.tabControl2.$el.offsetTop;
    },
    // 返回顶部按钮
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    // // 检测上拉刷新页面
    pullUpLoad() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
      this.$bus.$on("homeItemImageLoad", () => {});
    },
    //
    // 网络请求👇
    //
    // 请求网络数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        this.dKeywords = res.data.dKeyword.list;
        this.keywords = res.data.keywords.list;
      });
    },
    // 将获取的数据合并为一个数组
    getHomeGoods(type) {
      const page = (this.goods[type].page += 1);
      // 这的getHomeGoods是通过newwork引进来的,不是home里的getHomeGoods函数
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
      });
    },
  },
};
</script>

<style scoped>
body {
  padding-bottom: 49px;
}
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
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
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
</style>