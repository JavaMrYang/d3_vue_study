<template>
    <div id="chart"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo04',
  data () {
    return {
      duration: 500,
      root: {},
      tree: {},
      diagonal: {},
      i: 0
    }
  },
  mounted () {
    this.createTree()
  },
  methods: {
    createTree () {
      const _this = this
      let [m = [20, 120, 20, 120],
        w = 1280 - m[1] - m[3],
        h = 800 - m[0] - m[2]] = []

      _this.tree = d3.tree()
        .size([h, w])

      _this.diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.y, d.x] })

      _this.vis = d3.select('#chart').append('svg:svg')
        .attr('width', w + m[1] + m[3])
        .attr('height', h + m[0] + m[2])
        .append('svg:g')
        .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')')

      d3.json('@/data/flare.json', function (json) {
        _this.root = json
        _this.root.x0 = h / 2
        _this.root.y0 = 0

        function collapse (d) {
          if (d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
          }
        }

        _this.root.children.forEach(collapse)
        _this.update(_this.root)
      })
    },
    update (source) {
      const _this = this
      // Compute the new tree layout.
      var nodes = _this.tree.nodes(_this.root).reverse()

      // Normalize for fixed-depth.
      nodes.forEach(function (d) { d.y = d.depth * 180 })

      // Update the nodes…
      var node = _this.vis.selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++_this.i) })

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append('svg:g')
        .attr('class', 'node')
        .attr('transform', function (d) { return 'translate(' + source.y0 + ',' + source.x0 + ')' })
        .on('click', _this.click)

      nodeEnter.append('svg:circle')
        .attr('r', 1e-6)
        .style('fill', function (d) { return d._children ? 'lightsteelblue' : '#fff' })

      nodeEnter.append('svg:text')
        .attr('x', function (d) { return d.children || d._children ? -10 : 10 })
        .attr('dy', '.35em')
        .attr('text-anchor', function (d) { return d.children || d._children ? 'end' : 'start' })
        .text(function (d) { return d.name })
        .style('fill-opacity', 1e-6)

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(_this.duration)
        .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')' })

      nodeUpdate.select('circle')
        .attr('r', 4.5)
        .style('fill', function (d) { return d._children ? 'lightsteelblue' : '#fff' })

      nodeUpdate.select('text')
        .style('fill-opacity', 1)

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(_this.duration)
        .attr('transform', function (d) { return 'translate(' + source.y + ',' + source.x + ')' })
        .remove()

      nodeExit.select('circle')
        .attr('r', 1e-6)

      nodeExit.select('text')
        .style('fill-opacity', 1e-6)

      // Update the links…
      var link = _this.vis.selectAll('path.link')
        .data(_this.tree.links(nodes), function (d) { return d.target.id })

      // Enter any new links at the parent's previous position.
      link.enter().insert('svg:path', 'g')
        .attr('class', 'link')
        .attr('d', function (d) {
          var o = {x: source.x0, y: source.y0}
          return _this.diagonal({source: o, target: o})
        })
        .transition()
        .duration(_this.duration)
        .attr('d', _this.diagonal)

      // Transition links to their new position.
      link.transition()
        .duration(_this.duration)
        .attr('d', _this.diagonal)

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(_this.duration)
        .attr('d', function (d) {
          var o = {x: source.x, y: source.y}
          return _this.diagonal({source: o, target: o})
        })
        .remove()

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x
        d.y0 = d.y
      })
    },
    click (d) {
      const _this = this
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
        d._children = null
      }
      _this.update(d)
    }
  }
}
</script>

<style scoped>
  .node circle {
    cursor: pointer;
    fill: #fff;
    stroke: steelblue;
    stroke-width: 1.5px;
  }

  .node text {
    font: 10px sans-serif;
  }

  path.link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }
</style>
