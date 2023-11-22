<script setup lang="ts">
import TodoCreator from '@/components/TodoCreator.vue'
import { ref } from 'vue'
import { uid } from 'uid'
import { type todoStateType, type todoType } from '../types/todoType'
import TodoItem from '@/components/TodoItem.vue'
const todoList = ref<todoType[]>([])
// const createTodo = (todo: todoType) => {
//   console.log(todo.name)
//   todoList.value.push({
//     id: uid(),
//     name: todo.name,
//     isCompleted: false,
//     isEditing: false
//   })
// }

const CreateTodo = (todo: string) => {
  console.log(todo)
  todoList.value.push({
    id: uid(),
    name: todo,
    isCompleted: false,
    isEditing: false
  })
}
</script>

<template>
  <main>
    <h1>Create todo</h1>
    <TodoCreator @create-todo="CreateTodo" />
    <ul>
      <TodoItem v-for="todo in todoList" :key="todo.id" :todo="todo" />
    </ul>
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
