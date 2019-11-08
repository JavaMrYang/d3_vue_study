<template>
    <svg class="chart">

    </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo10',
  mounted () {
    this.load3()
  },
  methods: {
    load3 () {
      let data = [4, 8, 15, 16, 23, 42]
      let width = 420; let barHeight = 20
      let x = d3.scaleLinear().domain([0, d3.max(data)])
        .range([0, width])
      var chart = d3.select('.chart')
        .attr('width', width)
        .attr('height', barHeight * data.length)

      var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')' })

      bar.append('rect')
        .attr('width', x)
        .attr('height', barHeight - 1).attr('fill', 'blue')

      bar.append('text')
        .attr('x', function (d) { return x(d) - 3 })
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function (d) { return d })
    }
  }
}
</script>

<style scoped>
  .chart rect {
     fill: steelblue;
   }

  .chart text {
    fill: white;
    font: 10px sans-serif;
    text-anchor: end;
  }
</style>
