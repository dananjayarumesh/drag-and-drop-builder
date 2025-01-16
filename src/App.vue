<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable'

const list1 = ref([
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
]);

const list2 = ref([
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 66" },
]);

const onDragEnd = () => {
  console.log("Drag ended. Final list order:", list2.value);
};
</script>

<template>
  <div class="grid grid-cols-[20%_80%]">
    <div class="draggable-container">
      <draggable v-model="list1" class="draggable-list" :sort="false" ghost-class="ghost" @end="onDragEnd"
        :group="{ name: 'people', pull: 'clone', put: false }">
        <template #item="{ element }">
          <div class="draggable-item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div>
      <draggable v-model="list2" class="draggable-list" ghost-class="ghost" @end="onDragEnd" group="people">
        <template #item="{ element }">
          <div class="draggable-item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
