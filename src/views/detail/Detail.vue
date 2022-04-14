<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav"
      @title-click="titleClick"
      :currentIndex="currentIndex"
      ref="navBar"
    />
    <b-scroll class="content" @scroll="scroll" ref="scroll" :probeType="3">
      <detail-swiper :topImages="topImages" class="detail-swiper" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="paramInfo" :paramInfo="paramInfo" />
      <detail-comment-info ref="commentInfo" :commentInfo="commentInfo" />
      <goods-list ref="recommends" :goods="recommends" />
    </b-scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :isShow="isShow" /> -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "components/common/bscroll/Scroll.vue";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { ADD_COUNTER, ADD_TO_CART } from "store/mutation-types";
import { mapActions } from "vuex";

// import Toast from "components/common/toast/Toast.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      isUpdata: 0,
      desc: "",
      commentInfo: {},
      recommends: [],
      themeTopYs: [0],
      currentIndex: 0,
      message: "",
      isShow: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BScroll,
    DetailBottomBar,

    // Toast,
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    getoffsetTop() {
      console.log();
    },
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求相应的值
    getDetail(this.iid).then((res) => {
      this.topImages = res.result.itemInfo.topImages;
      // this.desc = res.result.itemInfo.desc;
      const data = res.result;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 判断评论是否为空
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 获取推荐
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    // 映射Actions
    ...mapActions(["addCart"]),
    // 返回底部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    // 监听图片加载
    imageLoad() {
      this.$refs.scroll.refresh();
      this.$nextTick(() => {
        this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        console.log(this.themeTopYs);
      });
    },
    // 点击标题跳转
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    scroll(position) {
      // 判断返回顶部图标显示
      this.isShowBackTop = position.y < -1000;
      // 获取数组长度
      let length = this.themeTopYs.length;
      // 判断区域在什么范围内,显示对于的标题
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            -position.y >= this.themeTopYs[i] &&
            -position.y < this.themeTopYs[i + 1]) ||
            (i === length - 1 && -position.y >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.navBar.currentIndex = i;
        }
      }
    },
    // 添加到购物车
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      product.realPrice = this.goods.realPrice;
      this.addCart(product).then((res) => {
        //   this.message = res;
        //   this.isShow = true;
        //   setTimeout(() => {
        //     this.isShow = false;
        //     this.message = false;
        //   }, 1500);
        this.$toast.show(res, 2000);
        console.log(this.$toast);
      });
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 102px);
}
</style>