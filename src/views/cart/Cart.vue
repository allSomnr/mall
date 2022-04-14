<template>
  <div>
    <nav-bar class="navbar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import cartList from "./childComps/cartList.vue";
import cartBottomBar from "./childComps/cartBottomBar.vue";
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    cartList,
    NavBar,
    cartBottomBar,
  },
  computed: {
    // ...mapGetters(['cartLength']),
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.navbar {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  z-index: 9;
}
</style>