<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable'

const list1 = ref([
  { id: 1, type: 'text', text: "This is the text component. Feel free to change the value." },
  { id: 2, type: 'image', name: "Item 2" }
]);

const list2 = ref([]);

const onDragEnd = () => {
  console.log("Drag ended. Final list order:", list2.value);
};
</script>

<template>
  <div class="grid grid-cols-[30%_70%]">
    <div class="border h-screen border-solid bg-white p-3">
      <draggable v-model="list1" class="draggable-list" :sort="false" ghost-class="ghost" @end="onDragEnd"
        :group="{ name: 'people', pull: 'clone', put: false }">
        <template #item="{ element }">
          <div v-if="element.type === 'text'"
            class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-2 p-2 hover:cursor-pointer">
            {{ element.text }}
          </div>
          <div v-else-if="element.type === 'image'"
            class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-2 p-2 hover:cursor-pointer">
            <div class="w-full h-64 bg-gray-100 flex items-center justify-center">
              <img class="h-full object-cover object-center" src="@/assets/images/1.jpg">
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="">
      <div class="w-full border p-3 text-right">
        <button type="button" class="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700">Save Changes</button>
      </div>
      <div class="flex justify-center">
        <draggable v-model="list2" class="draggable-list w-2/4 border mt-11 relative p-12" ghost-class="ghost"
          @end="onDragEnd" group="people">
          <template #item="{ element }">
            <div v-if="element.type === 'text'"
              class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-4 p-2 hover:cursor-pointer">
              {{ element.text }}
            </div>
            <div v-else-if="element.type === 'image'"
              class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-4 p-2 hover:cursor-pointer">
              <div class="w-full h-64 bg-gray-100 flex items-center justify-center">
                <img class="h-full object-cover object-center" src="@/assets/images/1.jpg">
              </div>
            </div>
          </template>
          <template #header v-if="list2.length === 0">
            <div class="absolute top-1/2 left-1/2">Drag elements here</div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
