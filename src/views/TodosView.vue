<script setup lang="ts">
import TodoCreator from '@/components/TodoCreator.vue'
import { ref, watch, computed } from 'vue'
import { uid } from 'uid'
import { Icon } from '@iconify/vue'
import { type todoStateType, type todoType } from '../types/todoType'
import TodoItem from '@/components/TodoItem.vue'
const todoList = ref<todoType[]>([])

watch(
  todoList,
  () => {
    setTodoListLocalStorage()
  },
  {
    deep: true
  }
)

const todoComputed = computed(() => {
  return todoList.value.every((todo) => todo.isCompleted)
})

const setTodoListLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList.value))
}

const fetchTodoList = () => {
  const savedTodoList = localStorage.getItem('todoList')

  if (savedTodoList !== null) {
    const parsedTodoList = JSON.parse(savedTodoList)
    todoList.value = parsedTodoList
  }
}

fetchTodoList()

const CreateTodo = (todo: string) => {
  console.log(todo)
  todoList.value.push({
    id: uid(),
    name: todo,
    index: todoList.value.length,
    isCompleted: false,
    isEditing: false
  })
}

const toggleComplete = (todoPos: number) => {
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted
}

const editTodo = (id: string) => {
  const todo = todoList.value.find((todo) => todo.id === id)
  if (todo) {
    todo.isEditing = !todo.isEditing
  }
}

const updateTodo = (editedValue: string, id: string) => {
  const todo = todoList.value.find((todo) => todo.id === id)
  if (todo) {
    todo.name = editedValue
  }
}

const deleteTodo = (id: string) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id)
}
</script>

<template>
  <main>
    <h1>Create todo</h1>
    <TodoCreator @create-todo="CreateTodo" />
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem
        v-for="(todo, index) in todoList"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @toggle-complete="toggleComplete"
        @edit-todo="editTodo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </ul>
    <p class="todos-msg" v-else>
      <Icon icon="noto-v1:sad-but-relieved-face" color="green" width="30" />
      <span>No todos to complete. Add one!</span>
    </p>

    <p v-if="todoComputed && todoList.length > 0" class="todos-msg">
      <span>You have completed all your todos</span>
    </p>
  </main>
</template>

<style scoped lang="scss">
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

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
