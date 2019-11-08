<template>
  <div class="chart">
    <div style="width: 40px;">4</div>
    <div style="width: 80px;">8</div>
    <div style="width: 150px;">15</div>
    <div style="width: 160px;">16</div>
    <div style="width: 230px;">23</div>
    <div style="width: 420px;">42</div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Demo09',
  data () {
    return {
      links: [
        {source: '同花顺', target: 'IFIND', type: 'resolved', rela: '主营产品'},
        {source: '同花顺', target: '手机金融信息服务', type: 'resolved', rela: '主营产品'},
        {source: '同花顺', target: '互联网金融信息服务', type: 'resolved', rela: '主营产品'},
        {source: '同花顺', target: '网上行情交易系统', type: 'resolved', rela: '主营产品'},
        {source: '同花顺', target: '金融资讯及数据服务', type: 'resolved', rela: '主营产品'},
        {source: '同花顺', target: '互联网金融', type: 'resolved', rela: '主营产品'},
        {source: '同花顺', target: '金融服务', type: 'resolved', rela: '主营产品'},
        {source: '手机金融信息服务', target: '金融信息服务', type: 'resolved', rela: '上位产品'},
        {source: '互联网金融信息服务', target: '金融信息服务', type: 'resolved', rela: '上位产品'},
        {source: '二三四五002195', target: '金融信息服务', type: 'resolved', rela: '主营产品'},
        {source: '大智慧601519', target: '金融信息服务', type: 'resolved', rela: '主营产品'},
        {source: '大智慧601519', target: '互联网金融信息服务', type: 'resolved', rela: '主营产品'},
        {source: '金融服务', target: '移动互联网', type: 'resolved', rela: '上游'},
        {source: '金融服务', target: '互联网金融服务', type: 'resolved', rela: '下位产品'},
        {source: '金融服务', target: '综合金融服务', type: 'resolved', rela: '下位产品'}
      ],
      nodes: [],
      circle: null,
      text: null,
      data: [4, 8, 15, 16, 23, 42]
    }
  },
  mounted () {
    // this.load() //d3第一章节学习
    this.load3()
  },
  methods: {
    load () {
      const body = d3.select('body').style('background-color', 'blue')
      body.append('p').style('color', 'blue').text('hello,world')
      // 给body标签总共添加4个p标签
      for (let i = 0; i < 3; i++) {
        body.append('p').text('我是第' + (i + 1) + '标签')
      }

      // 给所有标签设置一个颜色渐进色
      d3.selectAll('p').style('color', function () {
        return 'hsl(' + Math.random() * 360 + ',100%,50%)'
      })

      // 选取所有的p标签，为偶数和奇数节点交替显示灰色阴影
      d3.selectAll('p').style('color', function (i) {
        return i % 2 ? '#fff' : '#eee'
      })

      /**
       * 计算属性通常是指绑定数据。数据被指定为值的数组，并且每个值都作为第一个参数（d）传递给选择函数。
       * 使用默认的按索引连接，数据数组中的第一个元素将传递到选择中的第一个节点，第二个元素将传递到第二个节点，依此类推
       */
      d3.selectAll('p').data([4, 8, 15, 16, 23, 42])
        .style('font-size', function (d) {
          return d + 'px'
        })

      /**
       * 将数据绑定到选择时，数据数组中的每个元素都会与选择中的相应节点配对。
       * 如果节点少于数据，则多余的数据元素构成回车选择，您可以通过附加到enter选择来实例化这些选择
       */
      d3.selectAll('p').data([4, 8, 15, 16, 23, 42]).enter()
        .append('p').text(function (d) {
          return `i'm number ${d}!`
        })

      /**
       * 更新节点是默认选择，即data运算符的结果。因此，如果您忘记了输入和退出选择，则将仅自动选择存在相应数据的元素。
       * 一种常见的模式是将初始选择分为三个部分：要修改的更新节点，要添加的输入节点和要删除的退出节点。
       */
      const p = d3.selectAll('p').data([4, 8, 15, 16, 23, 42]).text(function (d) {
        return d
      })

      p.enter().append('p').text((d) => { return d })

      p.exit().remove()

      /**
       * D3对转换的关注自然会扩展到动画转换。过渡会随着时间逐渐插入样式和属性。可以通过诸如“弹性”，“立方进出”和“线性”之类的缓动功能来控制补间。
       * D3的插值器支持原语，例如数字和嵌入字符串中的数字（字体大小，路径数据等）以及复合值。您甚至可以扩展D3的插值器注册表以支持复杂的属性和数据结构。
       */
      body.transition().style('background-color', 'green')

      body.append('circle').attr('r', '50').attr('fill', 'red').attr('stroke', 'blue')
        .attr('stroke-width', '2')
    },

    load3 () {
      const x = d3.scaleLinear().domain([0, d3.max(this.data)]).range([0, 420])

      d3.select('.chart').selectAll('div').data(this.data)
        .enter().append('div')
        .style('width', function (d) { return x(d) + 'px' })
        .text(function (d) { return d })
    }
  }

}
</script>

<style scoped>
  .chart div{
    font: 10px sans-serif;
    background-color: steelblue;
    text-align: right;
    padding: 3px;
    margin: 1px;
    color: white;
  }

  .circle {
    fill: #ccc;
    stroke: #333;
    stroke-width: 1.5px;
  }

  .text {
    font: 12px Microsoft YaHei;
    pointer-events: none;
    text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
  }
</style>
