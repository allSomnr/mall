<template >
  <tabbar class="tabbar">
    <tab-bar-item path="/Home" ActiveColor="#ff5777">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="slot-icon" />
      <img
        src="~assets/img/tabbar/home_active.svg"
        alt=""
        slot="slot-icon-active"
      />
      <div slot="slot-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/Category" ActiveColor="#ff5777">
      <img src="~assets/img/tabbar/category.svg" alt="" slot="slot-icon" />
      <img
        src="~assets/img/tabbar/category_active.svg"
        alt=""
        slot="slot-icon-active"
      />
      <div slot="slot-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="Cart" ActiveColor="#ff5777">
      <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="slot-icon" />
      <img
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
        slot="slot-icon-active"
      />
      <div slot="slot-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="Profile" ActiveColor="#ff5777">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="slot-icon" />
      <img
        src="~assets/img/tabbar/profile_active.svg"
        alt=""
        slot="slot-icon-active"
      />
      <div slot="slot-text">我的</div>
    </tab-bar-item>
  </tabbar>
</template>

<script>
import Tabbar from "components/common/Tabbar/Tabbar.vue";
import TabBarItem from "components/common/Tabbar/TabBarItem.vue";
export default {
  components: {
    Tabbar,
    TabBarItem,
  },
};
</script>

<style scoped>
.tabbar {
  z-index: 9;
}
</style>