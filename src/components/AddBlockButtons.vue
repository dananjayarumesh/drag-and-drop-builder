<template>
  <div class="sm:hidden px-10 pt-10">
    <button
      type="button"
      class="block mb-2 w-full bg-blue-500 text-white font-bold py-2 px-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700"
      @click="$emit('addBlock', 'text')"
    >
      Add Text Component
    </button>
    <button
      type="button"
      class="block w-full bg-blue-500 text-white font-bold py-2 px-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700"
      @click="$emit('addBlock', 'image')"
    >
      Add Image Component
    </button>
  </div>
</template>
