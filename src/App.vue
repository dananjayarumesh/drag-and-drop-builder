<script setup>
import { ref, reactive } from 'vue';
import BlockContainer from './components/BlockContainer.vue';
import EditDialog from './components/EditDialog.vue';
import defines from './defines';
import TopBar from './components/TopBar.vue';

const textBlocks = ref([
  { type: 'text', value: 'This is the text component. Feel free to change the value. ✨' },
]);

const imageBlocks = ref([{ type: 'image', value: defines.blockImages[0] }]);

const addedBlocks = ref([]);

const editData = reactive({
  show: false,
  editIndex: 0,
  element: {},
});

const duplicateComp = (index) => {
  const comp = addedBlocks.value[index];
  addedBlocks.value.splice(index + 1, 0, comp);
};

const removeComp = (index) => {
  addedBlocks.value.splice(index, 1);
};

const showEdit = (editIndex, element) => {
  editData.show = true;
  editData.editIndex = editIndex;
  editData.element = element;
};

const closeEdit = () => {
  editData.show = false;
};

const setEditValue = (value) => {
  const editIndex = editData.editIndex;
  let newList = [];
  addedBlocks.value.forEach((element, index) => {
    if (index === editIndex) {
      newList.push({ ...element, ...{ value: value } });
    } else {
      newList.push(element);
    }
  });
  addedBlocks.value = newList;
};

const moveUp = (index) => {
  if (index === 0) {
    return;
  }

  let newList = [];
  let previousBlock = {};
  addedBlocks.value.forEach((element, loopIndex) => {
    if (loopIndex === index - 1) {
      previousBlock = element;
    } else {
      newList.push(element);
    }
  });

  newList.splice(index, 0, previousBlock);
  addedBlocks.value = newList;
};

const moveDown = (index) => {
  if (index >= addedBlocks.value.length - 1) {
    return;
  }

  let newList = [];
  let nextBlock = {};
  let movingBlock = {};
  addedBlocks.value.forEach((element, loopIndex) => {
    if (loopIndex === index + 1) {
      nextBlock = element;
    } else if (loopIndex === index) {
      movingBlock = element;
    } else {
      newList.push(element);
    }
  });

  newList.splice(index, 0, nextBlock);
  newList.splice(index + 1, 0, movingBlock);

  addedBlocks.value = newList;
};

const addBlock = (type) => {
  switch (type) {
    case 'text':
      addedBlocks.value.push(textBlocks.value[0]);
      break;

    case 'image':
      addedBlocks.value.push(imageBlocks.value[0]);
      break;

    default:
      break;
  }
};

const submitBlockData = () => {
  const blockData = [];
  addedBlocks.value.forEach((element, index) => {
    let blockValueData;
    switch (element.type) {
      case 'text':
        blockValueData = { text: element.value };
        break;

      case 'image':
        blockValueData = { imageUrl: element.value };
        break;

      default:
        blockValueData = {};
        break;
    }
    blockData.push({
      ...{
        blockType: element.type,
        order: index + 1,
      },
      ...blockValueData,
    });
  });
  console.log(blockData);
};
</script>

<template>
  <TopBar @save="submitBlockData" />
  <div class="mt-[70px]">
    <div class="h-full fixed bg-white shadow-md z-10">
      <div class="h-full bg-white shadow-md overflow-auto hidden sm:block w-[200px] lg:w-[350px]">
        <div class="p-5">
          <div class="border-b mb-2">
            <p class="text-sm/6 font-semibold text-gray-900 mb-2">Text Components</p>
            <BlockContainer
              v-model="textBlocks"
              :class="'draggable-list'"
              :sort="false"
              :group="{ name: 'blocks', pull: 'clone', put: false }"
              itemKey="textBlocks"
            />
          </div>
          <div>
            <p class="text-sm/6 font-semibold text-gray-900 mb-2">Image Components</p>
            <BlockContainer
              v-model="imageBlocks"
              :class="'draggable-list'"
              :sort="false"
              :group="{ name: 'blocks', pull: 'clone', put: false }"
              itemKey="imageBlocks"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="max-h-screen ml-0 sm:ml-[200px] lg:ml-[350px] relative">
      <div class="sm:hidden px-10 pt-10">
        <button
          type="button"
          class="block mb-2 w-full bg-blue-500 text-white font-bold py-2 px-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700"
          @click="addBlock('text')"
        >
          Add Text Component
        </button>
        <button
          type="button"
          class="block w-full bg-blue-500 text-white font-bold py-2 px-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700"
          @click="addBlock('image')"
        >
          Add Image Component
        </button>
      </div>

      <div class="flex items-center justify-center">
        <BlockContainer
          v-model="addedBlocks"
          class="draggable-list w-[700px] mx-24 min-h-[500px] border mt-[7vh] mb-11 relative p-5 sm:p-10 bg-white"
          :group="'blocks'"
          :animation="150"
          :touchStartThreshold="50"
          :displayCompOptions="true"
          @duplicate="duplicateComp"
          @remove="removeComp"
          @edit="showEdit"
          @moveUp="moveUp"
          @moveDown="moveDown"
          :itemKey="'preview'"
          :placeholder="'Drag and drop components here.'"
        />
      </div>
    </div>
  </div>
  <EditDialog
    :show="editData.show"
    :blockData="editData.element"
    @closed="closeEdit"
    @submit="setEditValue"
  />
</template>
