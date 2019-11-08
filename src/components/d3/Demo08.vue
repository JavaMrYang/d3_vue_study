<template>
    <div>
      <p>dog</p>
      <p>cat</p>
      <p>pig</p>
    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo08',
  data () {
    return {}
  },
  mounted () {
    // this.loadData()
    this.loadExit()
  },
  methods: {
    loadData () {
      let dataset = [3, 6, 9, 12, 15]
      let p = d3.select('body').selectAll('p')
      let update = p.data(dataset) // 绑定数据，并得到更新部分
      // 从下面检验是否得到
      // 对update的处理
      update.text(function (d, i) {
        return 'update:' + d + ',i:' + i
      })

      let enter = update.enter()
      let pEnter = enter.append('p')
      pEnter.text(function (d, i) {
        return 'enter:' + d + ',index:' + i
      }).style('text-align', 'center')
    },
    loadExit () {
      let dataset = [3, 6]
      var p = d3.select('body')
        .selectAll('p')
      var update = p.data(dataset)// 绑定数据,并得到update部分
      var exit = update.exit()// 得到exit部分
      // 下面检验是否真的得到
      // 对于update的处理
      update.text(function (d, i) {
        return 'update: ' + d + ',index: ' + i
      })
      // 对于exit的处理通常是删除 ，但在这里我并没有这么做
      exit.text(function (d, i) {
        return 'exit'
      })
    }
  }
}
</script>

<style scoped>

</style>
