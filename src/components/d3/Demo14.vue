<template>
  <div>
  <svg width="100%" height="100%"  >
     <g id="testG" @mouseover = "ShowTooltip('Welcome To Here!' )" @mouseout = "HideTooltip()">
     <rect x="100" y="100" width="100" height="50" style="fill:rgb(120,255,255);"/>
     </g>
     <g id="tooltip" style="pointer-events: none">
     <rect id="ttr" x="0" y="0" rx="5" ry="5" width="100" height="16" style="visibility: hidden"/>
     <text id="ttt" x="0" y="0" style="visibility: hidden">dyn. Text</text>
     </g>
  </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo14',
  data () {
    return {
      ttrelem: {},
      tttelem: {}
    }
  },
  mounted () {
    this.getSVGDoc()
    this.ZoomControl()
  },
  methods: {
    getSVGDoc () {
      this.ttrelem = d3.select('#ttr')
      this.tttelem = d3.select('#ttt')
    },
    ShowTooltip (txt) {
      let posx, posy, curtrans, ctx, cty
      // const g = d3.select('#testG').select('rect')
      const svg = d3.select('svg')
      posx = document.body.clientWidth
      posy = document.body.clientHeight
      curtrans = svg._groups[0][0].currentTranslate
      ctx = curtrans.x
      cty = curtrans.y

      this.tttelem._groups[0][0].childNodes.item(0).data = txt
      console.log(posx - ctx)
      this.ttrelem.attr('x', posx - ctx)
      this.ttrelem.attr('y', posy - cty - 20)
      this.tttelem.attr('x', posx - ctx + 5)
      this.tttelem.attr('y', posy - cty - 8)
      this.ttrelem.attr('width', this.tttelem._groups[0][0].getComputedTextLength() + 10)
      this.tttelem.style('fill', '#0000CC').style('font-size', '11px').style('visibility', 'visible')
      this.ttrelem.style('fill', '#FFFFCC').style('stroke', '#000000').style('stroke-width', '0.5px')
        .style('visibility', 'visible')
    },
    HideTooltip () {
      this.ttrelem.style('visibility', 'hidden')
      this.tttelem.style('visibility', 'hidden')
    },
    ZoomControl () {
      let curzoom
      const svg = d3.select('svg')
      console.log(svg)
      curzoom = svg._groups[0][0].currentScale
      d3.select('#tooltip').attr('transform', 'scale(' + 1 / curzoom + ')')
    }
  }
}
</script>

<style scoped>

</style>
