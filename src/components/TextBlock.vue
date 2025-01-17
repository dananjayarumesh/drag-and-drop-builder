<script setup>

defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  }
});
</script>

<template>
  <div
    class="mx-auto text-center bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-4 p-6 hover:cursor-move">
    <p class="text-xl/8 text-gray-700">{{ text }}</p>
  </div>
</template>