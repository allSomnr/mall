<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tabbar {
  display: flex;
  text-align: center;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
}
.tab-bar-item {
  flex: 1;
  background-color: #f6f6f6;
  height: 49px;
  font-weight: 900;
  font-size: 14px;
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>