<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-buttom"
        :isCheck="allCheck"
        @click.native="isAllCheck"
      />
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="calculate" @click="goAdd">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/checkButton";

export default {
  name: "cartBottomBar",
  data() {
    return {
      isCheck: false,
    };
  },
  components: {
    checkButton,
  },

  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.realPrice * 1 * item.count * 1;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    allCheck() {
      if (this.$store.state.cartList.length != 0) {
        this.isCheck = this.$store.state.cartList.every((item) => {
          return item.checked == true;
        });
        return this.isCheck;
      } else {
        return false;
      }
    },
  },
  methods: {
    isAllCheck() {
      console.log("isAllCheck");
      if (this.isCheck) {
        this.$store.state.cartList.every((item) => {
          item.checked = false;
          return 1;
        });
      } else {
        this.$store.state.cartList.every((item) => {
          item.checked = true;
          return 1;
        });
      }
    },
    goAdd() {
      if (!this.checkLength) {
        this.$toast.show("请选择购买的商品", 1500);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  border-top: 1px solid #fff;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 10;
}
.bottom-bar > div {
  justify-content: center;
  flex: 1;
}
.check-content {
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.check-buttom {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.price {
  display: flex;
  align-items: center;
}
.calculate {
  display: flex;
  align-items: center;
  background-color: red;
  color: #fff;
}
</style>