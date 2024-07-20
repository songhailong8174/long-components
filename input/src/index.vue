<template>
  <el-input
    :show-word-limit="showWordLimit"
    :placeholder="placeholder"
    auto-complete="new-password"
    v-bind="$attrs"
    v-on="$listeners"
    @input="$emit('input', $event)"
  >
    <slot
      v-for="(name) in Object.keys(this.$slots)"
      :slot="name"
      :name="name"
    />
  </el-input>
</template>
<script>

export default {
  name: 'LongInput',
  props: {
    showWordLimit: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  }
}
</script>
