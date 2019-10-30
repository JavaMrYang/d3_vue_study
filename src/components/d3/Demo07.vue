<template>
  <div id="main">
    <p class=“firstElement”>first p</p>
    <p class="secondElement">second p</p>
    <p class="myclass">third p</p>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo07',
  data () {
    return {

    }
  },
  mounted () {
    // this.testDemo()
    // this.datumBind()
    this.dataBind()
  },
  methods: {
    // 选择器
    testDemo () {
      // 选择一个p标签变红
      d3.select('body').select('p').style('color', 'red')

      // 选择第二个元素
      d3.select('body').select('.secondElement').text('我选中了第二个元素')
    },
    // 数据绑定
    datumBind () {
      let str = 'is an animal'// 新建一个字符串
      let p = d3.select('body')
        .selectAll('p')

      p.datum(str)// 绑定
        .text(function (d, i) {
          return '第' + i + '个元素' + d
        })
    },
    dataBind () {
      var dataset = ['so cute', 'cute', 'fat']
      var p = d3.select('body')
        .selectAll('p')

      p.data(dataset)
        .text(function (d, i) {
          return '第' + i + '个动物' + d
        })
    }
  }
}
</script>

<style scoped>

</style>
