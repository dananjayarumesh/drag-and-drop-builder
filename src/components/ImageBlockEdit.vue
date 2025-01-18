<script setup>
import { ref } from 'vue';
import defines from '@/defines';

const { initSelected } = defineProps({
  initSelected: {
    type: String,
    required: true,
    default: '',
  },
});

const selectedImage = ref(initSelected);

const emit = defineEmits(['submit', 'cancel']);

const setSelected = (selected) => {
  selectedImage.value = selected;
};

const submit = () => {
  emit('submit', selectedImage.value);
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
        <DialogTitle as="h3" class="text-base font-semibold text-gray-900"
          >Select Image</DialogTitle
        >
        <div class="mt-2">
          <div class="grid grid-cols-2 gap-4">
            <div
              class="relative hover:outline outline-2 outline-offset-2 outline-blue-500 cursor-pointer"
              v-for="(blockImage, index) in defines.blockImages"
              :key="index"
              @click="setSelected(blockImage)"
            >
              <img :src="blockImage" />
              <div
                v-if="selectedImage === blockImage"
                class="absolute h-full w-full bg-black top-0 opacity-50 text-white flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    <button
      type="button"
      class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
      @click="submit"
    >
      Save
    </button>
    <button
      type="button"
      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      @click="cancel"
      ref="cancelButtonRef"
    >
      Cancel
    </button>
  </div>
</template>
