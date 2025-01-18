<template>
  <div class="fixed top-0 bg-black z-10 w-full p-4 grid grid-cols-2">
    <div class="text-white flex items-center">
      <p class="text-lg">Drag & Drop Editor</p>
    </div>
    <div class="text-right">
      <button
        type="button"
        class="bg-green-500 text-white font-bold py-2 px-4 shadow-lg hover:bg-green-600 focus:outline-none focus:ring-green-400 focus:ring-offset-2 active:bg-green-700"
        @click="$emit('save')"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>
