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
    class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-4 p-2 hover:cursor-pointer">
    {{ text }}
  </div>
</template>