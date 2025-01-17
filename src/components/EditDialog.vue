<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import TextBlockEdit from '@/components/TextBlockEdit.vue'
import ImageBlockEdit from './ImageBlockEdit.vue';

defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  blockData: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const emit = defineEmits(['submit', 'closed']);

const submitValue = (value) => {
  emit('submit', value);
  emit('closed');
}

const cancel = () => {
  emit('closed');
}
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog class="relative z-10" @close="$emit('closed')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <TextBlockEdit v-if="blockData.type === 'text'" :initText="blockData.value" @cancel="cancel"
                @submit="submitValue" />
              <ImageBlockEdit v-else-if="blockData.type === 'image'" :initSelected="blockData.value" @cancel="cancel"
                @submit="submitValue" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>