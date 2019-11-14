<template>
    <div>

    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo13',
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {
    this.drawRect1()
    this.drawRect2()
  },
  updated () {

  },
  methods: {
    drawRect1 () {
      const rect = d3.select('div').append('svg').attr('width', '500').attr('height', '400')
        .append('rect').attr('width', '300').attr('height', '30')
        .attr('cx', '50%').attr('cy', '50%')
        .style('fill', '#faa').style('fill-opacity', '0.5')
        .style('stroke', '#800').style('stroke-opacity', '0.5')
      rect.on('mouseover', function (e) {
        d3.select(this).style('fill-opacity', '1').style('stroke-opacity', '1')
      }).on('mouserout', function () {
        d3.select(this).style('fill-opacity', '0.5').style('stroke-opacity', '0.5')
      })
    },
    drawRect2 () {
      let rect = d3.select('svg').append('rect').attr('x', 200).attr('y', 40)
        .attr('height', 1).attr('width', '100')
      let height = rect.attr('height')
      let timeout = setInterval(function () {
        if (++height > 300) {
          clearInterval(timeout)
        }
        rect.attr('height', height)
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
