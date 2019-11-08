<template>
  <div id="container">
      <tree class="tree" ref="tree" :data="treeData"  :radius="radius" node-text="text" layoutType="horizontal" :zoomable="zoomable">

      <template #node="{data, node: {depth}, radius, isRetracted}">
        <template>
          <path transform="scale(0.05) translate(-10,-250)" :fill="isRetracted? 'red' : 'blue'" >
            <title>{{data.text}} {{depth}}</title>
          </path>
          <!--<circle r="6" :stroke="zoomable? 'blue' : 'yellow'" :fill="zoomable? 'blue' : 'yellow'">
            <title>{{data.text}} {{depth}}</title>
          </circle>-->
          <ellipse cx="0" cy="0" rx="20" ry="50" stroke="red" fill="grey">
            <title>{{data.text}}</title>
            <foreignObject width="120" height="50">
                <img src="@/assets/logo.png"/>
            </foreignObject>
          </ellipse>
        </template>
       <!-- <template v-else>
          <circle r="6" :stroke="zoomable? 'blue' : 'yellow'" :fill="zoomable? 'blue' : 'yellow'">
            <title>{{data.text}} {{depth}}</title>
          </circle>
        </template>-->
      </template>
      </tree>
  </div>
</template>

<script>
/* import * as d3 from 'd3' */
import {tree} from 'vued3tree'
export default {
  name: 'Demo11',
  components: {
    tree
  },
  data () {
    return {
      treeData: {},
      radius: 6,
      zoomable: true,
      isRetracted: false
    }
  },
  mounted () {
    const data = require('@/data/data')
    this.treeData = data.Graph.tree
    /* const size = this.$refs.tree.getSize()
    d3.select('#container').style('width', size.width).style('height', size.height) */
    // this.$refs.tree.internaldata.svg.attr('height', size.height)
  },
  methods: {
  }
}
</script>

<style scoped>
  .tree{
    width: 100%;
    height: 100%;
  }
  #container{
    height: 780px;
  }
   .linktree{
    stroke: #333333;
    stroke-opacity: 0.8;
  }
</style>
