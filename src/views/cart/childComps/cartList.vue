<template>
  <div class="cart-list">
    <b-scroll class="content" ref="scroll" :probeType="3">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      />
    </b-scroll>
  </div>
</template>

<script>
import BScroll from "components/common/bscroll/Scroll.vue";
import mapGetters from "vuex";
import cartListItem from "./cartListItem.vue";

export default {
  name: "cartList",
  data() {
    return {
      cartList: [],
    };
  },
  computed: {
    ...mapGetters["cartList"],
  },
  components: {
    BScroll,
    cartListItem,
  },
  created() {
    console.log(this.$store.state.cartList);
  },
  activated() {
    console.log("...........");

    this.cartList = this.$store.state.cartList;
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 133px);
}
.content {
  height: 100%;
}
.cart-list {
  /* overflow: hidden; */
  word-wrap: break-word;
}
</style>