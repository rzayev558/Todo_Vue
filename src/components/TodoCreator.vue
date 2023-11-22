<script setup lang="ts">
import type { todoStateType } from '@/types/todoType'
import { ref, defineEmits } from 'vue'
import TodoButton from './TodoButton.vue'
const emit = defineEmits(['create-todo'])

const todoState = ref<todoStateType>({ todo: '', invalid: false, error: '' })

const CreateTodo = () => {
  todoState.value.invalid = false
  if (todoState.value.todo !== '') {
    // console.log(todoState.value.todo)
    emit('create-todo', todoState.value.todo)
    todoState.value.todo = ''
    return
  }
  todoState.value.invalid = true
  todoState.value.error = 'Todo value cannot be empty!'
}
</script>

<template>
  <div class="input-wrap" :class="{ 'input-err': todoState.invalid }">
    <input type="text" v-model="todoState.todo" />
    <TodoButton @click="CreateTodo">Add Todo</TodoButton>
  </div>
  <p v-if="todoState.invalid" class="err-msg">{{ todoState.error }}</p>
</template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;
  &focus-within {
    box-shadow:
      0 -4px 6px -1px rgb(0, 0, 0 / 0.1),
      0 -2px 4px -2px rgb(0, 0, 0 / 0.1);
  }
  input {
    width: 100%;
    padding: 8px 6px;
    border:none &:focus {
      outline: none;
    }
  }
}
.err-msg {
  margin-top: 8px;
  font-size: 17‚px;
  text-align: center;
  color: red;
}
</style>
