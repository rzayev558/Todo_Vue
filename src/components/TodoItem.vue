<script setup lang="ts">
import type { todoType } from '@/types/todoType'

const props = defineProps<{ todo: todoType }>()
</script>
<template>
  <p>{{ props.todo.name }}</p>
</template>

<style scoped lang="scss"></style>
