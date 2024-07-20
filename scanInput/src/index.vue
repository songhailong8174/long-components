<template>
  <div style="display: flex;gap: 10px;align-items: center;">
    <el-input
      ref="scanInput"
      v-model="scanVal"
      @focus="inputFocus"
      v-focus
      v-bind="$attrs"
    ></el-input>
    <el-button type="text" v-if="showBtn" @click="handleSearch">查询</el-button>
  </div>
</template>

<script>
export default {
  name: "LongScanInput",
  props: {
    // 输入字符间的最大时间间隔（毫秒），用于判断是否为扫码枪输入
    maxInterval: {
      type: Number,
      default: 40,
    },
    // 扫码枪输入的最小长度
    minLength: {
      type: Number,
      default: 8,
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scannerInput: "",
      lastKeyPressTime: 0,
      isPageFocused: true, // 页面聚焦状态
      scanVal: "",
    };
  },
  methods: {
    handleSearch() {
      this.$emit('scan', this.scanVal)
    },
    handleKeyPress(event) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      const currentTime = Date.now();
      const timeDiff = currentTime - this.lastKeyPressTime;
      this.lastKeyPressTime = currentTime;
      // 正常处理扫码
      // 根据时间间隔判断是否为扫码枪输入
      if (
        (timeDiff < this.maxInterval || timeDiff === currentTime) &&
        !event.ctrlKey
      ) {
        this.$refs.scanInput.focus();
        this.scannerInput += event.key;
      } else {
        // 重置scannerInput，因为这可能是正常的键盘输入
        this.scannerInput = event.key;

        this.timer = setTimeout(() => {
          this.lastKeyPressTime = 0;
        }, 300);
      }
      // 检查扫码数据长度和结束字符
      if (event.key === "Enter" && this.scannerInput.length >= this.minLength) {
        this.$emit("scan", this.scanVal);
        this.scannerInput = "";
        this.scanVal = "";
        this.lastKeyPressTime = 0;
      }
    },
    inputFocus() {
    },
    handleWindowBlur() {
      console.warn("请聚焦到页面以进行扫码");
      this.isPageFocused = false;
      this.$emit("pageBlur", !this.isPageFocused);
    },
    handleWindowFocus() {
      this.lastKeyPressTime = 0;
      this.isPageFocused = true;

      this.$emit("pageBlur", !this.isPageFocused);
    },
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("blur", this.handleWindowBlur);
    window.addEventListener("focus", this.handleWindowFocus);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("blur", this.handleWindowBlur);
    window.removeEventListener("focus", this.handleWindowFocus);
  },
};
</script>
<style lang="scss" scoped></style>
