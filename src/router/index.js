import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import D3Demo01 from '@/components/d3/D3Demo01'
import Demo02 from '@/components/d3/Demo02'
import Demo03 from '@/components/d3/Demo03'
import Demo04 from '@/components/d3/Demo04'
import Demo05 from '@/components/d3/Demo05'
import Demo06 from '@/components/d3/Demo06'
import Demo07 from '@/components/d3/Demo07'
import Demo08 from '@/components/d3/Demo08'
import Demo09 from '@/components/d3/Demo09'
import Demo10 from '@/components/d3/Demo10'
import Demo11 from '@/components/d3/Demo11'
import Demo12 from '@/components/d3/Demo12'
import Demo13 from '@/components/d3/Demo13'
import Demo14 from '@/components/d3/Demo14'

import vue1 from '@/components/vue/Demo01'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/d3/demo1',
      name: 'D3Demo01',
      component: D3Demo01
    },
    {
      path: '/d3/demo2',
      name: 'Demo02',
      component: Demo02
    },
    {
      path: '/d3/demo3',
      name: 'Demo03',
      component: Demo03
    },
    {
      path: '/d3/demo4',
      name: 'Demo04',
      component: Demo04
    },
    {
      path: '/d3/demo5',
      name: 'Demo05',
      component: Demo05
    },
    {
      path: '/d3/demo6',
      name: 'Demo06',
      component: Demo06
    },
    {
      path: '/d3/demo7',
      name: 'Demo07',
      component: Demo07
    },
    {
      path: '/d3/demo8',
      name: 'Demo08',
      component: Demo08
    },
    {
      path: '/d3/demo9',
      name: 'Demo09',
      component: Demo09
    },
    {
      path: '/d3/demo10',
      name: 'Demo10',
      component: Demo10
    },
    {
      path: '/d3/demo11',
      name: 'Demo11',
      component: Demo11
    },
    {
      path: '/d3/demo12',
      name: 'Demo12',
      component: Demo12
    },
    {
      path: '/d3/demo13',
      name: 'Demo13',
      component: Demo13
    },
    {
      path: '/d3/demo14',
      name: 'Demo14',
      component: Demo14
    },
    {
      path: '/vue/vue1',
      name: 'vue1',
      component: vue1
    }
  ]
})
