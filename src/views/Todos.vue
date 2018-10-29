<template>
  <div>
    <div class="todos-container">
      <div class="todos" v-for="(todo, index) in todos" :key="`todo-${index}`" :class="[index + 1 < todos.length ? todos[index + 1].indent < todo.indent ? `indent-${todo.indent} end` : `indent-${todo.indent}` : `indent-${todo.indent} end`, { 'completed': todo.completed }]">
        <div class="checkbox" @click="toggle(todo, index)">
          <p>
            <font-awesome-icon v-if="index === loadingItem" :icon="['fas', 'circle-notch']" spin />
            <font-awesome-icon v-else-if="todo.completed" :icon="['fas', 'check-circle']" />
            <font-awesome-icon v-else :icon="['far', 'circle']" />
          </p>
        </div>
        <div class="date" v-if="todo.indent > 1"><p>{{ new Date(todo.due.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) }}</p></div>
        <div class="name" @click="openEvent(todo.url)"><p>{{ todo.content }}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        loadingItem: -1
      }
    },
    computed: {
      ...mapGetters(['todos'])
    },
    mounted () {
      this.getTodos()
    },
    methods: {
      ...mapActions(['getTodos', 'toggleTodos']),
      async toggle (todo, index) {
        this.loadingItem = index
        let success = await this.toggleTodos(todo)
        if (success) {
          await this.getTodos()
          this.loadingItem = -1
        }
      },
      openEvent (url) {
        window.open(url, '_blank')
      }
    }
  }
</script>
