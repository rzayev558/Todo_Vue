<script setup lang="ts">
import type { todoType } from '@/types/todoType'
import { Icon } from '@iconify/vue'
import { defineEmits } from 'vue'
defineEmits(['toggle-complete', 'edit-todo', 'update-todo', 'delete-todo'])
const props = defineProps<{ todo: todoType }>()
</script>
<template>
  <li>
    <input
      type="checkbox"
      :checked="todo.isCompleted"
      @input="$emit('toggle-complete', props.todo.index)"
    />
    <div class="todo">
      <input
        v-if="todo.isEditing"
        type="text"
        :value="todo.name"
        @input="
          (event: Event) =>
            $emit('update-todo', (event.target as HTMLInputElement).value, props.todo.id)
        "
      />
      <span v-else :class="{ 'completed-todo': props.todo.isCompleted }">
        {{ todo.name }}
      </span>
    </div>
    <div class="todo-actions">
      <Icon
        v-if="todo.isEditing"
        icon="material-symbols:check-circle-outline"
        class="icon check-icon"
        color="green"
        width="25"
        @click="$emit('edit-todo', props.todo.id)"
      />
      <Icon
        v-else
        @click="$emit('edit-todo', props.todo.id)"
        icon="ph:pencil-fill"
        color="blue"
        width="25"
        class="edit-icon"
      />
      <Icon
        icon="ph:trash"
        color="red"
        width="25"
        class="trash-icon"
        @click="$emit('delete-todo', props.todo.id)"
      />
    </div>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 10px;
  background-color: #f1f1f1;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  &:hover {
    .todo-actions {
      opacity: 1;
    }
  }

  input[type='checkbox'] {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);

    &:checked {
      background-color: #41b080;
    }
  }

  .todo {
    flex: 1;

    .completed-todo {
      text-decoration: line-through;
    }

    input[type='text'] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }

  .todo-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }
}
</style>
