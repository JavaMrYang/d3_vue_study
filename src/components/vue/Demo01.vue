<template>
    <div>
        <h1>我是父组件!</h1>
        <child1 message="我是子组件一!"></child1>

        <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
        <child1 v-bind:message="a+b"></child1>

        <!-- 用一个变量进行动态赋值。-->
        <child1 v-bind:message="msg"></child1>
    </div>
</template>

<script>
import child1 from '@/components/vue/Child1'
export default {
  name: 'Demo01',
  components: {
    child1
  },
  data () {
    return {
      a: '我是子组件二',
      b: 112233,
      msg: '我是子组件三！' + Math.random()
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
