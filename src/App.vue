<script setup>
import { ref } from 'vue';
import CompContainer from './components/CompContainer.vue';

const list1 = ref([
  { id: 1, type: 'text', text: "This is the text component. Feel free to change the value." },
  { id: 2, type: 'image', name: "Item 2" }
]);

const list2 = ref([]);

const onDragEnd = () => {
  console.log("Drag ended. Final list order:", list2.value);
};

const duplicateComp = (index) => {
  const comp = list2.value[index];
  list2.value.splice(index + 1, 0, comp);
};

const removeComp = (index) => {
  list2.value.splice(index, 1);
};
</script>

<template>
  <div class="grid grid-cols-[30%_70%]">
    <div class="border h-screen border-solid bg-white p-3">
      <CompContainer v-model="list1" class="draggable-list" :sort="false" ghost-class="ghost" @end="onDragEnd"
        :group="{ name: 'components', pull: 'clone', put: false }" />
    </div>
    <div>
      <div class="w-full border p-3 text-right">
        <button type="button"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700">Save
          Changes</button>
      </div>
      <div class="flex justify-center">
        <CompContainer v-model="list2" class="draggable-list w-2/4 border mt-11 relative p-12" ghost-class="ghost"
          @end="onDragEnd" group="components" animation="150" :displayCompOptions="true" @duplicate="duplicateComp"
          @remove="removeComp" />
      </div>
    </div>
  </div>
</template>
