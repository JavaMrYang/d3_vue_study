<template>
  <div>
    <rect></rect>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo02',
  data () {
    return {

    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let datas = [250, 210, 170, 130, 90]
      let width = 300
      let height = 300
      // 制作画布
      let svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      let rectHeight = 25// 定义每个矩形的高度
      svg.style('background-color', 'black')
      svg.selectAll('rect')
        .data(datas)
        .enter()
        .append('rect')
        .attr('x', 20)// 生成的图形距离画布左侧20px
        .attr('y', function (d, i) { // 生成的图形距离画布顶部20px
          return i * rectHeight
        })
        .attr('width', function (d) { // 矩形的宽度，这里直接使用的数据的值
          return d
        })
        .attr('height', rectHeight - 2)// 矩形的高度
        .attr('fill', 'steelblue')// 矩形的颜色
    }
  }
}
</script>

<style scoped>

</style>
