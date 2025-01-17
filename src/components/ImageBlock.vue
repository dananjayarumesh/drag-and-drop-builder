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
    class="mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-4 hover:cursor-move">
    <div class="w-full max-h-60 flex items-center justify-center">
      <img class="w-full h-auto object-cover object-center" :src="imageUrl">
    </div>
  </div>
</template>