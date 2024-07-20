<template>
  <div class="menu-selector">

    <div class="title-box">
      <el-checkbox v-model="allChecked" @change="checkAll">选择全部</el-checkbox>
      <span>{{ title }}</span>
    </div>

    <div class="box">
      <template v-for="menu in list">
        <div class="menu" :key="menu.menuId">
          <el-checkbox v-model="menu.checked" @change="(val) => menuChange(val, menu)"><span class="name">{{ menu.menuName }}</span></el-checkbox>
        </div>
        <template>
          <el-row class="sub" v-for="sub in menu.children" :key="sub.menuId">
            <el-col :span="4">
              <el-checkbox v-model="sub.checked" @change="(val) => menuChange(val, sub)"><span class="name">{{ sub.menuName }}</span></el-checkbox>
            </el-col>
            <el-col :span="20" class="btns">
              <template v-if="sub.children">
                <el-checkbox v-for="btn in sub.children" @change="(val) => menuChange(val, btn)" v-model="btn.checked" :key="btn.menuId">{{ btn.menuName }}</el-checkbox>
              </template>
            </el-col>
          </el-row>
        </template>
      </template>
    </div>
  </div>
</template>
<script>

export default {
  name: 'LongMenuSelector',
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    selectedIds: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      allChecked: false
    }
  },
  watch: {
    menus: {
      immediate: true,
      deep: true,
      handler() {
        this.parseList()
      }
    },
    selectedIds: {
      immediate: true,
      handler() {
        this.parseList()
      }
    }
  },
  methods: {
    parseList() {
      let list = JSON.parse(JSON.stringify(this.menus))
      let list1 = JSON.parse(JSON.stringify(this.menus))
      this.appendPropery(list)
      this.list = list
      const idList = this.flatten(list1)
      const checkedObj = Object.fromEntries(this.selectedIds.map(item => [item, item]))
      this.allChecked = idList.every(item => checkedObj[item] != undefined)
    },
    flatten(arr) {
      let result = []
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item.children && item.children.length > 0) {
          result = result.concat(this.flatten(item.children))
        } else {
          result.push(item.id)
        }
      }
      return result
    },
    appendPropery(list, parent = null) {
      list.forEach(item => {
        item.checked = this.selectedIds.includes(item.menuId)
        item.parent = parent
        if (item.children && item.children.length > 0) {
          this.appendPropery(item.children, item)
        }
      })
    },
    checkAll(val) {
      this.list.forEach(item => {
        item.checked = val
        this.menuChange(val, item)
      })
    },
    // checkParent(menu, val) {
    //   menu.checked = this.hasChecked(menu)
    //   if (menu.parent) {
    //     this.checkParent(menu.parent, val)
    //   }
    // },
    menuChange(val, menu) {
      // menu.checked = !menu.children ? val : menu.children.some(item => item.checked == true)
      // if (menu.parent) {
      //   menu.parent.checked = menu.parent.children.some(item => item.checked == true)
      // }
      // if (menu.children && menu.children.length > 0) {
      //   for (let i = 0; i < menu.children.length; i++) {
      //     this.menuChange(val, menu.children[i])
      //   }
      // }

      menu.checked = val

      if (menu.children && menu.children.length > 0) {
        for (let i = 0; i < menu.children.length; i++) {
          this.menuChange(val, menu.children[i])
        }
      } else {
        menu.checked = val
      }

      if (menu.parent && menu.menuType != 'F') {
        const parent = menu.parent
        parent.checked = parent.children.some(item => item.checked == true)
        if (parent.parent) {
          parent.parent.checked = parent.parent.children.some(item => item.checked == true)
        }
      }

    },
    getSelectedMenus(menu, selectedList) {
      if (menu.checked) selectedList.push(menu.menuId)
      if (menu.children && menu.children.length > 0) {
        for (let i = 0; i < menu.children.length; i++) {
          this.getSelectedMenus(menu.children[i], selectedList)
        }
      }
    },
    $getValues() {
      // get selected
      let selectedList = []
      this.list.forEach(item => {
        if (item.checked) selectedList.push(item.menuId)
        this.getSelectedMenus(item, selectedList)
      })
      return Array.from(new Set(selectedList))
    },
    $reset() {
      this.allChecked = false
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-selector {
  .title-box {
    text-align: center;
  }
  .box {
    padding: 20px;
    .menu {
      padding: 10px;
      border-bottom: 1px solid #EBEEF5;
      margin-bottom: 10px;
      .name {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .sub {
      padding: 10px 10px 10px 0;
      display: flex;
      margin-left: 40px;
      .name {
        font-size: 16px;
        font-weight: bold;
      }
      .btns {
        // margin-left: 20px;
      }
    }
  }
  .btn-box {
    text-align: center;
  }
}
</style>
