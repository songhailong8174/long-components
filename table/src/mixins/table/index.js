export default {
  data() {
    return {
      tableCfg: {
        loading: false,
        exportLoading: false,
        showSearch: true
      },
      tableData: {
        rows: [],
        total: 0
      },
      pageParams: {
        pageNum: 1,
        pageSize: 10
      },
      selectedList: []
    }
  },
  methods: {
    $getParams() {
      let queryParams = this.queryParams || {}
      if (this.showPage) {
        Object.assign(queryParams, this.pageParams)
      }
      let params = JSON.parse(JSON.stringify(queryParams))
      if (this.dateKeys) {
        for (const [key, value] of Object.entries(this.dateKeys)) {
          if (params[key]) {
            [ params[value[0]], params[value[1]] ] = params[key]
            delete params[key]
          }
        }
      }

      return params
    },
    $handleQuery() {
      if (this.search) {
        this.$refs['queryForm'].validate(valid => {
          if (valid) {
            this.pageParams.pageNum = 1
            this.$emit('search')
            this.getList()
          }
        })
      } else {
        this.pageParams.pageNum = 1
        this.$emit('search')
        this.getList()
      }
    },
    $resetQuery() {
      this.resetForm("queryForm")
      if (this.clearFields && this.clearFields.length > 0) {
        this.clearFields.forEach(key => {
          if (this.queryParams[key]) {
            this.queryParams[key] = ''
          }
        })
      }
      this.$emit('reset')
      this.$handleQuery()
    },
    $setLoading(flag) {
      this.tableCfg.loading = flag
    },
    $setResponse(response) {
      this.$setLoading(false)
      if (response.rows) {
        this.tableData.rows = response.rows && response.rows
        this.tableData.total = response.total && response.total
      } else {
        this.tableData.rows = response.data && response.data
        this.tableData.total = response.data && response.data.length
      }
    },
    $handleSelectionChange(selection) {
      this.selectedList = selection
      this.$emit('select-change', selection)
    },
    $getSelected() {
      return this.selectedList
    },
    $getTableData() {
      return this.tableData
    },
  }
}
