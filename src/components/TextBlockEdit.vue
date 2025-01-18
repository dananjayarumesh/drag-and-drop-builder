<script setup>
import { ref } from 'vue';
import { DialogTitle } from '@headlessui/vue';

const { initText } = defineProps({
  initText: {
    type: String,
    required: true,
    default: '',
  },
});

const newText = ref(initText);

const emit = defineEmits(['submit', 'cancel']);

const submit = () => {
  emit('submit', newText.value);
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
        <DialogTitle as="h3" class="text-base font-semibold text-gray-900">Update Text</DialogTitle>
        <div class="mt-2">
          <textarea class="w-full border p-2" rows="5" v-model="newText"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    <button
      type="button"
      class="inline-flex w-full justify-center bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
      @click="submit"
    >
      Update
    </button>
    <button
      type="button"
      class="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      @click="cancel"
      ref="cancelButtonRef"
    >
      Cancel
    </button>
  </div>
</template>
