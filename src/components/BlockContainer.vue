<script setup>
import draggable from 'vuedraggable';
import BlockOptions from './BlockOptions.vue';
import TextBlock from './TextBlock.vue';
import ImageBlock from './ImageBlock.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  displayCompOptions: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: true,
    default: '',
  },
});

const isClickHolding = ref(false);
const disablePlaceholder = ref(false);

const observedElement = ref(null);
let observer = null;

onMounted(() => {
  if (props.placeholder !== '') {
    trackListChanges();
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const trackListChanges = () => {
  observedElement.value = document.querySelector('.draggable-list.with-placeholder');
  if (observedElement.value !== null) {
    observer = new MutationObserver(() => {
      const childElements = observedElement.value.children;
      const filteredChildren = Array.from(childElements).filter((child) =>
        child.classList.contains('sortable-block'),
      );
      disablePlaceholder.value = filteredChildren.length > 0;
    });

    observer.observe(observedElement.value, {
      childList: true,
    });
  }
};

const chooseBlock = () => {
  isClickHolding.value = true;
};

const unChooseBlock = () => {
  isClickHolding.value = false;
};
</script>

<template>
  <draggable
    :class="{ 'with-placeholder': props.placeholder }"
    filter=".block-options"
    v-bind="$attrs"
    v-on="$attrs"
    @choose="chooseBlock"
    @unchoose="unChooseBlock"
    dragClass="sortable-drag"
  >
    <template #item="{ element, index }">
      <div class="sortable-block group relative">
        <BlockOptions
          v-if="displayCompOptions && !isClickHolding"
          @duplicate="$emit('duplicate', index)"
          @remove="$emit('remove', index)"
          @edit="$emit('edit', index, element)"
          @moveUp="$emit('moveUp', index)"
          @moveDown="$emit('moveDown', index)"
        />
        <TextBlock v-if="element.type === 'text'" :text="element.value" />
        <ImageBlock v-else-if="element.type === 'image'" :image-url="element.value" />
      </div>
    </template>
    <template #header v-if="$attrs.modelValue.length === 0 && !disablePlaceholder">
      <div class="flex items-center justify-center min-h-96">
        <p class="truncate text-sm/5 text-gray-500">{{ placeholder }}</p>
      </div>
    </template>
  </draggable>
</template>
