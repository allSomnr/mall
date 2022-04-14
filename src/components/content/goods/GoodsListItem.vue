<template>
  <div class="goods-item" @click="goodsClick">
    <img v-lazy="getImage" alt="" @load="imageLoad" class="Image" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="cfav">☆{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    imageLoad() {
      if (this.$route.path.indexOf("/home")) {
        this.$bus.$emit("detailItemImageLoad");
      } else if (this.$route.path.indexOf("/detail")) {
        this.$bus.$emit();
      }
    },
    goodsClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  margin-bottom: 50px;

  position: relative;
  width: 50%;
  text-align: center;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.price {
  color: var(--color-high-text);
}
.cfav {
  margin-left: 5px;
}
.Image {
  height: 245px;
}
</style>