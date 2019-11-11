<template>
  <div id="tooltip" class="hidden">
    <p><strong>Important Label Heading</strong></p>
    <p><span id="value">100</span></p>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo12',
  data () {
    return {}
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      // 生成数据
      var dataset = []
      var maxvalue = 25
      for (var i = 0; i < maxvalue; i++) {
        var num = Math.floor(Math.random() * maxvalue)
        dataset.push(num)
      }

      // 宽高
      var w = 1000
      var h = 300
      var padding = 20
      // 生成比例尺
      var xScale = d3.scaleOrdinal().domain(d3.range(dataset.length))
        .range([0, w], 0.05)
      var yScale = d3.scaleLinear().domain([0, d3.max(dataset)])
        .range([h - padding, padding])
      // 生成svg
      var svg = d3.select('body').append('svg').attr('width', w).attr('height', h)
      // 生成柱形图并绑定数据
      svg.selectAll('rect').data(dataset).enter().append('rect')
        .attr('x', function (d, i) {
          return xScale.domain()[i] * (w / dataset.length)
        })
        .attr('y', function (d) {
          return yScale(d)
        })
        .attr('width', w / dataset.length - 2)
        .attr('height', function (d) {
          return h - yScale(d)
        })
        .attr('fill', '#81D4FA')
        .on('mouseover', function (d) {
          var xPosition = parseFloat(d3.select(this).attr('x')) + (w / dataset.length) / 2
          var yPosition = parseFloat(d3.select(this).attr('y')) / 2 + h / 2

          console.log(d)
          // Update the tooltip position and value
          d3.select('#tooltip')
            .style('left', xPosition + 'px')
            .style('top', yPosition + 'px')
            .select('#value')
            .text(d)

          // Show the tooltip
          d3.select('#tooltip').classed('hidden', false)
          return d3.select(this).attr('fill', '#FF9100')
        })
        .on('mouseout', function (d) {
          d3.select('#tooltip').classed('hidden', true)
          return d3.select(this).transition().duration(1000).attr('fill', '#81D4FA')
        })
        .on('click', function () {
          sortby()
          return sortbytext()
        }).append('title').text(function (d) {
          return d
        })
      // 生成标签
      svg.selectAll('text').data(dataset).enter().append('text').text(function (d) {
        return d
      })
        .attr('x', function (d, i) {
          return xScale.domain()[i] * (w / dataset.length) + (w / dataset.length) / 2
        })
        .attr('y', function (d) {
          return yScale(d) + 20
        })
        .attr('font-size', '10px')
        .attr('font-family', 'san-serif')
        .attr('fill', 'red')
      var sortby = function () {
        svg.selectAll('rect').sort(function (a, b) {
          return d3.ascending(a, b)
        }).transition().duration(1000).attr('x', function (d, i) {
          return xScale.domain()[i] * (w / dataset.length)
        })
      }
      var sortbytext = function () {
        svg.selectAll('text').sort(function (a, b) {
          return d3.ascending(a, b)
        }).transition().duration(1000).attr('x', function (d, i) {
          return xScale.domain()[i] * (w / dataset.length)
        })
      }
    }
  }
}
</script>

<style scoped>
  rect:hover {
    fill: orange;
  }

  #tooltip {
    position: absolute;
    width: 200px;
    height: auto;
    padding: 10px;
    background-color: white;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  #tooltip.hidden {
    display: none;
  }

  #tooltip p {
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
    line-height: 20px;
  }
</style>
