<script setup>
import draggable from 'vuedraggable';
import BlockOptions from './BlockOptions.vue';
import TextBlock from './TextBlock.vue';
import ImageBlock from './ImageBlock.vue';

defineProps({
  displayCompOptions: {
    type: Boolean,
    required: false,
    default: false
  }
});
</script>

<template>
  <draggable v-bind="$attrs" v-on="$attrs">
    <template #item="{ element, index }">
      <div class="group relative">
        <BlockOptions v-if="displayCompOptions" @duplicate="$emit('duplicate', index)" @remove="$emit('remove', index)"
          @edit="$emit('edit', index, element)" />
        <TextBlock v-if="element.type === 'text'" :text="element.value" />
        <ImageBlock v-else-if="element.type === 'image'" :image-url="element.value" />
      </div>
    </template>
    <template #header v-if="$attrs.modelValue && $attrs.modelValue.length === 0">
      <div class="flex items-center justify-center">
        <div>Drag elements here</div>
      </div>

    </template>
  </draggable>
</template>