<script setup>
import { ref, reactive } from 'vue';
import BlockContainer from './components/BlockContainer.vue';
import EditDialog from './components/EditDialog.vue';
import defines from './defines';

const textBlocks = ref([
  { type: 'text', value: "This is the text component. Feel free to change the value." }
]);

const imageBlocks = ref([
  { type: 'image', value: defines.blockImages[0] }
]);

const list2 = ref([]);

const editData = reactive({
  show: false,
  editIndex: 0,
  element: {}
});

const duplicateComp = (index) => {
  const comp = list2.value[index];
  list2.value.splice(index + 1, 0, comp);
};

const removeComp = (index) => {
  list2.value.splice(index, 1);
};

const showEdit = (editIndex, element) => {
  editData.show = true;
  editData.editIndex = editIndex;
  editData.element = element;
}

const closeEdit = () => {
  editData.show = false;
}

const setEditValue = (value) => {
  const editIndex = editData.editIndex;
  let newList = [];
  list2.value.forEach((element, index) => {
    if (index === editIndex) {
      newList.push({ ...element, ...{ value: value } });
    } else {
      newList.push(element);
    }
  });
  list2.value = newList;
}

const onAdd = (e, originalEvent) => {
  console.log(e,originalEvent);
}
</script>

<template>
  <div class="grid grid-cols-[20%_80%]">
    <div class="h-screen bg-white shadow-md overflow-auto">
      <!-- <div class="w-full border p-3 bg-neutral-600 text-white">
        <h1>Component Picker</h1>
      </div> -->
      <div class="p-3">
        <p class="text-sm/6 font-semibold text-gray-900">Text Components</p>
        <BlockContainer v-model="textBlocks" :class="'draggable-list'" :sort="false"
          :group="{ name: 'blocks', pull: 'clone', put: false }" itemKey="textBlocks" />

        <p class="text-sm/6 font-semibold text-gray-900">Image Components</p>
        <BlockContainer v-model="imageBlocks" :class="'draggable-list'" :sort="false"
          :group="{ name: 'blocks', pull: 'clone', put: false }" itemKey="imageBlocks" />
      </div>
    </div>
    <div class="max-h-screen overflow-auto">
      <div class="w-full border p-3 text-right">
        <button type="button"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700">Save
          Changes</button>
      </div>
      <div class="flex items-center justify-center">
        <BlockContainer v-model="list2" :class="'draggable-list w-2/4 border mt-11 mb-11 relative p-10 bg-white'"
          group="blocks" animation="150" :displayCompOptions="true" @move="onAdd" @duplicate="duplicateComp"
          @remove="removeComp" @edit="showEdit" itemKey="preview" />
      </div>
    </div>
  </div>
  <EditDialog :show="editData.show" :blockData="editData.element" @closed="closeEdit" @submit="setEditValue" />
</template>
