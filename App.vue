<template>
  <div id="app">
    <div> I am Vue APP 2.1 </div>
    <GetTodo></GetTodo>
    <CurrentTodo></CurrentTodo>
  </div>
</template>

<script>
    import GetTodo from './components/GetTodo.vue'
    import CurrentTodo from './components/CurrentTodo.vue'

    export default {
      asyncData ({ store, route }) {
        console.log('app async data run')
        // 触发 action 后，会返回 Promise
        return store.dispatch('fetchTodos')
      },
      components: {
        GetTodo,
        CurrentTodo
      }
   }
</script>