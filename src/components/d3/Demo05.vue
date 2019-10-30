<template>
    <div id="tree"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo05',
  data () {
    return {
      index: 0,
      duration: 750,
      root: null
    }
  },
  mounted () {
    const size = this.getSize()
    // 构造一个标签
    // d3.select('#tree').append('p').text('我是tree下面的第一个标签')

    const data = require('@/data/flare')
    const root = this.tree(data)
    let x0 = Infinity
    let x1 = -x0
    root.each(d => {
      if (d.x > x1) x1 = d.x
      if (d.x < x0) x0 = d.x
    })
    const svg = d3.select('#tree').append('svg')
      .attr('viewBox', [0, 0, size.width, x1 - x0 + root.dx * 2])
    const g = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`)

    g.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))

    const node = g.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`)

    node.append('circle')
      .attr('fill', d => d.children ? '#555' : '#999')
      .attr('r', 2.5)

    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -6 : 6)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)
      .clone(true).lower()
      .attr('stroke', 'white')
  },
  methods: {
    getSize () {
      const {$el: {clientWidth: width, clientHeight: height}} = this
      return { width, height }
    },
    tree (data) {
      const root = d3.hierarchy(data)
      root.dx = 10
      root.dy = this.getSize().width / (root.height + 1)
      return d3.tree().nodeSize([root.dx, root.dy])(root)
    }
  }

}
</script>

<style scoped>
  .tree{
    width: 100%;
    height: 1000px;
    background: #f8f8fb;
  }
  .node {
    cursor: pointer;
  }

  .node circle {
    fill: none;
    stroke: #fff;
    stroke-width: 1.5px;
  }

  .node text {
    font: 10px sans-serif;
  }

  .link {
    fill: none;
    stroke: #999;
    stroke-width: 1.5px;
  }

  .tree svg {
    width: 100%;
    height: 100%;
  }

</style>
