<script setup>
import draggable from 'vuedraggable';
import CompOptions from './CompOptions.vue';
import TextComp from './TextComp.vue';
import ImageComp from './ImageComp.vue';
import Image from '@/assets/images/1.jpg';

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
        <CompOptions v-if="displayCompOptions" @duplicate="$emit('duplicate', index)"
          @remove="$emit('remove', index)" />
        <TextComp v-if="element.type === 'text'" :text="element.text" />
        <ImageComp v-else-if="element.type === 'image'" :image-url="Image" />
      </div>
    </template>
    <template #header v-if="$attrs.modelValue && $attrs.modelValue.length === 0">
      <div class="absolute top-1/2 left-1/2">Drag elements here</div>
    </template>
  </draggable>
</template>