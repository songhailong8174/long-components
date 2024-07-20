<template>
  <div>
    <long-input
      v-bind="$attrs"
      v-model="iptValue"
      readOnly
      @focus="show"
      style="width: 300px"
    />
    <long-dialog ref="winRef" width="380px" append-to-body showClose>
      <div style="display: flex;gap: 20px;align-items: center;">
        <div style="width: 140px;">
          <ul class="ul">
            <li v-for="(item, index) in dayList" @click="dateClickHandle(item)" :class="item.checked ? 'active' : ''" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div style="flex: 1;">
          <ul class="ul" style="background: unset !important;">
            <li v-for="(item, index) in timeList" @click="timeClickHandle(item)" :class="item.checked ? 'active' : ''" :key="index">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <template #foot>
        <div style="text-align: center;margin-top: 30px;">
          <el-button type="primary" @click="onConfirm">确认</el-button>
        </div>
      </template>
    </long-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'LongTimeSelector',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iptValue: '',
      dayList: [],
      timeList: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.iptValue = val
      }
    }
  },
  methods: {
    show() {
      this.$refs['winRef'].$show({
        title: this.title
      })
      this.init()
    },
    init() {
      this.dayList = []
      const now = dayjs()
      for (let index = 0; index < 7; index ++) {
        this.dayList.push({
          checked: false,
          name: now.add(index, 'days').format('MM月DD日'),
          value: now.add(index, 'days').format('YYYY-MM-DD')
        })
      }
      this.dateClickHandle(this.dayList[0])
      // this.initTimes(now.format('YYYY-MM-DD'))
    },
    getTimePerfix(hour) {
      hour = parseInt(hour)
      let perfix = '全天'
      if (hour >= 6 && hour < 12) {
        perfix = '上午'
      } else if (hour >= 12 && hour < 18) {
        perfix = '下午'
      } else if (hour >= 18 && hour < 23) {
        perfix = '晚上'
      }
      return perfix
    },
    initTimes(day) {
      let startHour = 6

      if (dayjs().format('YYYY-MM-DD') == day) {
        startHour = dayjs().hour() + 1
        this.timeList = []
      } else {
        startHour = 6
        this.timeList = [{
          name: '全天都可以',
          value: `${this.getTimePerfix(0)} 00:00 - 24:00`,
          checked: false
        }]
      }

      for (let time = startHour; time < 21; time +=3) {
        if (time + 3 < 21) {
          const perfix = this.getTimePerfix(time)
          this.timeList.push({
            name: `${perfix} ${time}:00 - ${time + 3}:00`,
            value: `${perfix} ${time}:00 - ${time + 3}:00`,
            checked: false
          })
        } else {
          const perfix = this.getTimePerfix(time)
          this.timeList.push({
            name: `${perfix} ${time}:00 - 21:00`,
            value: `${perfix} ${time}:00 - 21:00`,
            checked: false
          })
        }
      }

    },
    dateClickHandle(item) {
      this.dayList.forEach(date => {
        date.checked = false
      })
      item.checked = true
      this.initTimes(item.value)
    },
    timeClickHandle(item) {
      this.timeList.forEach(date => {
        date.checked = false
      })
      item.checked = true
    },
    onConfirm() {
      if (this.dayList.filter(item => item.checked == true).length == 0) {
        return
      }
      if (this.timeList.filter(item => item.checked == true).length == 0) {
        return
      }
      const date = this.dayList.filter(item => item.checked == true)[0]
      const time = this.timeList.filter(item => item.checked == true)[0]
      this.$refs['winRef'].$hide()
      this.$emit('input', `${date.value} ${time.value}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.ul {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #ddd;
  text-align: center;
  li {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    &.active {
      background: #fff;
      color: rgb(4, 172, 61);
      font-weight: bold;
    }
  }
}
</style>
