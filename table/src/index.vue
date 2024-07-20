<template>
  <div :class="{'app-container': wrapUp}">
    <slot name="title"></slot>
    <el-form :model="queryParams" ref="queryForm" :rules="queryFormRules" :inline="true" v-show="tableCfg.showSearch" :label-width="labelWidth">
      <slot name="query"></slot>
      <el-form-item v-if="search">
        <el-button type="primary" icon="el-icon-search" @click="$handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="$resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8" v-if="showToolbar">
      <slot name="toolbar">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="$handleAdd"
            v-hasPermi="[permissions.add]"
          >新增</el-button>
        </el-col>
        <!-- <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            :loading="tableCfg.exportLoading"
            @click="$handleImport"
            v-hasPermi="[permissions.import]"
          >导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            :loading="tableCfg.exportLoading"
            @click="$handleExport"
            v-hasPermi="[permissions.export]"
          >导出</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            :loading="tableCfg.exportLoading"
            @click="$handleDownload"
            v-hasPermi="[permissions.download]"
          >下载模版</el-button>
        </el-col> -->
      </slot>
      <!-- <right-toolbar :showSearch.sync="tableCfg.showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <div style="margin-top: 20px;">
      <slot name="tips"></slot>
    </div>

    <el-table v-bind="$attrs" :row-key="rowKey" style="margin-top: 10px;" v-loading="tableCfg.loading" :data="tableData.rows" :header-cell-style="{ fontWeight: 'bold' }" @selection-change="$handleSelectionChange">
      <el-table-column type="selection" v-if="checkBox" width="55" />
      <el-table-column v-if="showNumber" label="序号" type="index" width="55" />
      <slot name="columns"></slot>
      <slot name="operate">
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="$handleUpdate(scope.row)"
              v-hasPermi="[permissions.modify]"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="$handleDelete(scope.row)"
              v-hasPermi="[permissions.remove]"
            >删除</el-button>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <div v-if="showPage">
      <long-pagination
        v-show="tableData.total>0"
        :total="tableData.total"
        :page.sync="pageParams.pageNum"
        :limit.sync="pageParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import TableMixin from './mixins/table'
import ToolbarMixin from './mixins/table/toolbar'
// v-hasPermi="[permissions.add]"

//  v-hasPermi="[permissions.modify]"

// v-hasPermi="[permissions.remove]"

export default {
  name: 'LongTable',
  props: {
    showNumber: {
      type: Boolean,
      default: true
    },
    queryParams: {
      type: Object,
      default: () => {}
    },
    queryFormRules: {
      type: Object,
      default: () => { }
    },
    autoLoad: {
      type: Boolean,
      default: true
    },
    loadFun: {
      type: Function,
      default: () => {}
    },
    wrapUp: {
      type: Boolean,
      default: true
    },
    msgs: {
      type: Object,
      default: () => {}
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    labelWidth: {
      type: String,
      default: '68px'
    },
    search: {
      type: Boolean,
      default: true,
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    dateKeys: {
      type: Object,
      default: () => {}
    },
    permissions: {
      type: Object,
      default: () => {
        return {
          add: '',
          modify: '',
          remove: '',
          detail: '',
          export: ''
        }
      }
    },
    afterIntercept: {
      type: Function,
      default: null
    },
    checkBox: {
      type: Boolean,
      default: false
    },
    clearFields: {
      type: Array,
      default: () => []
    },
    showPage: {
      type: Boolean,
      default: true
    }
  },
  mixins: [ TableMixin, ToolbarMixin ],
  data() {
    return {
    }
  },
  created() {
    if (this.autoLoad) {
      this.getList()
    }
  },
  methods: {
    $load() {
      this.getList()
    },
    getList() {
      this.$setLoading(true)
      if (this.loadFun) {
        this.loadFun()(this.$getParams()).then(response => {
          this.$emit('loaded', response)
          if (this.afterIntercept) {
            this.afterIntercept(response).then(res => {
              this.$setResponse(res)
            })
          } else {
            this.$setResponse(response)
          }
        })
      }
    },
    $reload() {
      this.$handleQuery()
    }
  }
};
</script>
