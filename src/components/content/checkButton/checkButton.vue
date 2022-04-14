<template>
  <div class="check-button" :class="{ check: isCheck }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    isCheck: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #333;
}
.check {
  background-color: red;
  border: 1px solid red;
  border-radius: 50%;
}
</style>