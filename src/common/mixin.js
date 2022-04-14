import { debounce } from './utils'
import BackTop from "components/content/backTop/backTop.vue";

export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("detailItemImageLoad", () => {

      refresh();
    });
  },
}
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    // 返回底部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    }
  },
  components: {
    BackTop,
  }
}