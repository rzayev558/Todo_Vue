<script setup lang="ts">
import TodoCreator from '@/components/TodoCreator.vue'
import { ref } from 'vue'

const todoList = ref<todoType[]>([])
type todoType = {
  todo: string
}
const createTodo = (todo: todoType) => {
  todoList.value.push({ todo: todo.todo })
}
</script>

<template>
  <main>
    <h1>Create todo</h1>
    <TodoCreator @create-todo="createTodo" />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;
  h1 {
    margin-bottom: 16px;
    text-align: center;
  }
}
</style>
