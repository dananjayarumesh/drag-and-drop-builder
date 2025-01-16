<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
    default: ''
  }
});
</script>

<template>
  <div
    class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-4 p-2 hover:cursor-pointer">
    <div class="w-full h-64 bg-gray-100 flex items-center justify-center">
      <img class="h-full object-cover object-center" :src="imageUrl">
    </div>
  </div>
</template>