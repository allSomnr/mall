<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // isShow: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  padding: 15px 20px;
  border-radius: 5px;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 10;
}
</style>