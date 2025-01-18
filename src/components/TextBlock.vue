<script setup>
defineProps({
  text: {
    type: String,
    required: true,
    default: '',
  },
});
</script>

<template>
  <div
    class="mx-auto text-center bg-white border border-gray-200 shadow-lg overflow-hidden mb-4 p-6 hover:cursor-move hover:outline"
  >
    <p class="text-base/7 text-gray-600">{{ text }}</p>
  </div>
</template>
