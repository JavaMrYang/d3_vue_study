<template>
  <div id="main" style="margin: 0 auto">
    <div id="search">
      <input class="s-search-text" placeholder="搜索你想要的内容" id="s-search-text"  v-model="message"  >
      <button type="primary" @click="search">搜索</button>
    </div>
    <div id="tree"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

const data = require('@/data/flare')
const dx = 10
const width = document.body.offsetWidth
const dy = width / 6
const margin = {top: 10, right: 120, bottom: 10, left: 40}
const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
const tree = d3.tree().nodeSize([dx, dy])
const internaldata = {}

export default {
  name: 'Demo06',
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    const root = d3.hierarchy(data)
    internaldata.root = root
    root.x0 = dy / 2
    root.y0 = 0
    root.descendants().forEach((d, i) => {
      d.id = i
      d._children = d.children
      if (d.depth && d.data.name.length !== 7) d.children = null
    })

    const svg = d3.select('#tree').append('svg')
      .attr('viewBox', [-margin.left, -margin.top, width, dx])
      .style('font', '10px sans-serif')
      .style('user-select', 'none')
    internaldata.svg = svg

    const gLink = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
    internaldata.gLink = gLink

    const gNode = svg.append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all')
    internaldata.gNode = gNode
    this.update(root)
  },
  methods: {
    search () {
      let names = internaldata.root.map(d => d.data.name)
      console.log(names)
      /* console.log(internaldata.root)
      internaldata.root.each(e => {
        console.log(e.data.name)
      }) */
      // console.log(d3.)
    },
    getSize () {
      const {$el: {clientWidth: width, clientHeight: height}} = this
      return {width, height}
    },
    update (source) {
      const duration = d3.event && d3.event.altKey ? 2500 : 250
      const nodes = internaldata.root.descendants().reverse()
      const links = internaldata.root.links()

      // Compute the new tree layout.
      tree(internaldata.root)

      let left = internaldata.root
      let right = internaldata.root
      internaldata.root.eachBefore(node => {
        if (node.x < left.x) left = node
        if (node.x > right.x) right = node
      })

      const height = right.x - left.x + margin.top + margin.bottom

      const transition = internaldata.svg.transition()
        .duration(duration)
        .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
        .tween('resize', window.ResizeObserver ? null : () => () => internaldata.svg.dispatch('toggle'))

      // Update the nodes…
      const node = internaldata.gNode.selectAll('g')
        .data(nodes, d => d.id)

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0).on('click', d => {
          d.children = d.children ? null : d._children
          this.update(d)
        }).on('dblclick', d => {
          d3.event.preventDefault()
          alert('鼠标移出事件')
        }).on('contextmenu', d => {
          d3.event.preventDefault()
          alert('youji')
        })

      nodeEnter.append('circle')
        .attr('r', 5)
        .attr('fill', d => d._children ? '#555' : '#999')
        .attr('stroke-width', 10)

      nodeEnter.append('text')
        .attr('dy', '0.31em')
        .attr('x', d => d._children ? -6 : 6)
        .attr('text-anchor', d => d._children ? 'end' : 'start')
        .text(d => d.data.name)
        .clone(true).lower()
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .attr('stroke', 'white')

      // Transition nodes to their new position.
      node.merge(nodeEnter).transition(transition)
        .attr('transform', d => `translate(${d.y},${d.x})`)
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1)

      // Transition exiting nodes to the parent's new position.
      node.exit().transition(transition).remove()
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)

      // Update the links…
      const link = internaldata.gLink.selectAll('path')
        .data(links, d => d.target.id)

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append('path')
        .attr('d', d => {
          const o = {x: source.x0, y: source.y0}
          return diagonal({source: o, target: o})
        })

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr('d', diagonal)

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr('d', d => {
          const o = {x: source.x, y: source.y}
          return diagonal({source: o, target: o})
        })

      // Stash the old positions for transition.
      internaldata.root.eachBefore(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

  }
}
</script>

<style scoped>

</style>
