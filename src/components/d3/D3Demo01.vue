<template>
  <div id="chart">
    <p></p>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'D3Demo01',
  data () {
    return {
      msg: 'test'
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      let p = d3.select('#chart').append('p').text('我是一个测试元素')
      p.style('color', 'red')
        .style('font-size', '30px')
      d3.select('body').selectAll('p').data([4, 8, 15, 16, 23, 42])
        .enter().append('p')
        .text(function (d) { return 'I’m number ' + d + '!' })
    }
  }
}
</script>

<style scoped>

</style>
