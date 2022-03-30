<template>
  <div class="tab-bar-item" @click="ActiveItem">
    <div v-if="!isActive">
      <slot name="slot-icon">
        <img src="~assets/img/tabbar/home.svg" alt="" />
      </slot>
    </div>
    <div v-else>
      <slot name="slot-icon-active">
        <img src="~assets/img/tabbar/home.svg" alt="" />
      </slot>
    </div>
    <div :style="activeStyle">
      <slot name="slot-text"> 首页 </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    path: String,
    ActiveColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActive() {
      console.log("11111111");
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.ActiveColor } : {};
    },
  },
  methods: {
    ActiveItem() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.active {
  color: pink;
}
</style>