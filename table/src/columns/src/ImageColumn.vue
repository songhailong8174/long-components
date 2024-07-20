<template>
  <el-table-column v-bind="$attrs" :prop="fieldKey">
    <template slot-scope="scope">
      <el-image v-if="scope.row[fieldKey]" :src="scope.row[fieldKey]" :preview-src-list="[scope.row[fieldKey]]"></el-image>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'LongTableImageColumn',
  props: {
    fieldKey: {
      type: String,
      default: 'img'
    },
    imgWidth: {
      type: [String, Number],
      default: '120px'
    },
    imgHeight: {
      type: [String, Number],
      default: '80px'
    }
  },
  methods: {
    getFieldKey() {
      return this.fieldKey || 'img'
    }
  }
}
</script>
