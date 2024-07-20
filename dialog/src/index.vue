<template>
  <el-dialog
    custom-class="common-win"
    :visible.sync="winState"
    :close-on-click-modal="false"
    :show-close="showClose"
    v-bind="$attrs"
    @close="beforeClose"
  >
  <div class="win-title" slot="title">{{ title }}</div>
  <slot></slot>
  <slot name="foot">
    <div class="win-footer" slot="footer">
      <el-button @click="$hide">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="onSave">{{ btnText }}</el-button>
    </div>
  </slot>

  </el-dialog>
</template>
<script>
export default {
  name: 'LongDialog',
  props: {
    btnText: {
      type: String,
      default: '保 存'
    },
    closeCallback: {
      type: Function
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      winState: false,
      loading: false,
      edit: true,
      title: ''
    }
  },
  methods: {
    $show(params) {
      this.title = params.title
      this.winState = true
    },
    $hide() {
      this.$nextTick(() => {
        this.beforeClose()
      })
      this.winState = false
    },
    beforeClose () {
      if (this.closeCallback) {
        this.closeCallback()
      }
    },
    onSave() {
      this.$emit('submit')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .common-win {
  .el-dialog__header {
    // background-color: rgba(240, 240, 240);
    background-color: #04AEFF;
     .el-dialog__headerbtn {
      .el-dialog__close {
        color: #fff !important;
        font-size: 22px !important;
      }
    }

  }
  .win-title {
    // padding: 25px 0 10px;
    font-size: 20px;
    // font-weight: bold;
    text-align: left;
    color: #fff;
  }
  .el-dialog__body {
    padding: 25px 60px;
  }
  .win-footer {
    text-align: center;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
