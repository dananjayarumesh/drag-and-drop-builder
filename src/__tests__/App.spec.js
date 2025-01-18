import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AppComponent from '@/App.vue';
import defines from '@/defines';

vi.mock('@/defines.js', () => ({
  default: {
    blockImages: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
    ],
  },
}));

vi.mock('@/components/BlockContainer.vue', () => ({
  default: {
    name: 'BlockContainer',
    template: '<div></div>',
    methods: {
      duplicate: vi.fn(),
      remove: vi.fn(),
      edit: vi.fn(),
    },
    props: ['modelValue'],
  },
}));

vi.mock('@/components/EditDialog.vue', () => ({
  default: {
    name: 'EditDialog',
    template: '<div></div>',
    methods: {
      closed: vi.fn(),
      submit: vi.fn(),
    },
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      blockData: {
        type: Object,
        required: true,
      },
    },
  },
}));

describe('App.vue', () => {
  it('check text blocks showing correctly', () => {
    const wrapper = mount(AppComponent);
    const textBlocksContainer = wrapper.findAllComponents({ name: 'BlockContainer' })[0];
    expect(textBlocksContainer.props().modelValue).toStrictEqual([
      {
        type: 'text',
        value: 'This is the text component. Feel free to change the value.',
      },
    ]);

    wrapper.vm.textBlocks.push({ type: 'text', value: 'Text block' });
    expect(textBlocksContainer.props().modelValue).toStrictEqual([
      { type: 'text', value: 'This is the text component. Feel free to change the value.' },
      { type: 'text', value: 'Text block' },
    ]);
  });

  it('check image blocks showing correctly', () => {
    const wrapper = mount(AppComponent);
    const imageBlocksContainer = wrapper.findAllComponents({ name: 'BlockContainer' })[1];
    expect(imageBlocksContainer.props().modelValue).toStrictEqual([
      {
        type: 'image',
        value: defines.blockImages[0],
      },
    ]);

    wrapper.vm.imageBlocks.push({ type: 'image', value: defines.blockImages[2] });
    expect(imageBlocksContainer.props().modelValue).toStrictEqual([
      { type: 'image', value: defines.blockImages[0] },
      { type: 'image', value: defines.blockImages[2] },
    ]);
  });

  it('check added blocks showing correctly', () => {
    const wrapper = mount(AppComponent);
    const addedBlocksContainer = wrapper.findAllComponents({ name: 'BlockContainer' })[2];

    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block' });
    expect(addedBlocksContainer.props().modelValue).toStrictEqual([
      { type: 'text', value: 'Text block' },
    ]);

    wrapper.vm.addedBlocks.push({ type: 'image', value: defines.blockImages[1] });
    expect(addedBlocksContainer.props().modelValue).toStrictEqual([
      { type: 'text', value: 'Text block' },
      { type: 'image', value: defines.blockImages[1] },
    ]);
  });

  it('duplicates a block correctly', () => {
    const wrapper = mount(AppComponent);

    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block to duplicate' });

    const addedBlocksContainer = wrapper.findAllComponents({ name: 'BlockContainer' })[2];
    addedBlocksContainer.vm.$emit('duplicate', 0);

    expect(wrapper.vm.addedBlocks.length).toBe(2);
    expect(wrapper.vm.addedBlocks).toStrictEqual([
      { type: 'text', value: 'Text block to duplicate' },
      { type: 'text', value: 'Text block to duplicate' },
    ]);
  });

  it('removes a block correctly', () => {
    const wrapper = mount(AppComponent);

    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block 1' });
    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block 2' });
    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block 3' });

    const addedBlocksContainer = wrapper.findAllComponents({ name: 'BlockContainer' })[2];
    addedBlocksContainer.vm.$emit('remove', 1);

    expect(wrapper.vm.addedBlocks.length).toBe(2);
    expect(wrapper.vm.addedBlocks).toStrictEqual([
      { type: 'text', value: 'Text block 1' },
      { type: 'text', value: 'Text block 3' },
    ]);
  });

  it('opens edit dialog with correct data', async () => {
    const wrapper = mount(AppComponent);

    const addedBlocksContainer = wrapper.findAllComponents({ name: 'BlockContainer' })[2];
    addedBlocksContainer.vm.$emit('edit', 1, { type: 'text', value: 'Initial text value' });

    expect(wrapper.vm.editData).toStrictEqual({
      show: true,
      editIndex: 1,
      element: { type: 'text', value: 'Initial text value' },
    });

    await wrapper.vm.$nextTick();

    const editDialog = wrapper.findComponent({ name: 'EditDialog' });
    expect(editDialog.props().show).toBe(true);
    expect(editDialog.props().blockData).toStrictEqual({
      type: 'text',
      value: 'Initial text value',
    });
  });

  it('edit dialog submit with updated values', async () => {
    const wrapper = mount(AppComponent);

    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block 1' });
    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block 2' });
    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block 3' });

    wrapper.vm.editData.show = true;
    wrapper.vm.editData.editIndex = 1;
    wrapper.vm.editData.element = { type: 'text', value: 'Text block 2' };

    await wrapper.vm.$nextTick();

    const editDialog = wrapper.findComponent({ name: 'EditDialog' });
    editDialog.vm.$emit('submit', 'Updated text value');

    expect(wrapper.vm.addedBlocks).toStrictEqual([
      { type: 'text', value: 'Text block 1' },
      { type: 'text', value: 'Updated text value' },
      { type: 'text', value: 'Text block 3' },
    ]);
  });

  it('close edit dialog', async () => {
    const wrapper = mount(AppComponent);

    wrapper.vm.editData.show = true;

    const editDialog = wrapper.findComponent({ name: 'EditDialog' });
    editDialog.vm.$emit('closed');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.editData.show).toBe(false);
  });

  it('submits and logs added block data correctly', () => {
    const wrapper = mount(AppComponent);

    wrapper.vm.addedBlocks.push({ type: 'text', value: 'Text block value' });
    wrapper.vm.addedBlocks.push({ type: 'image', value: defines.blockImages[0] });

    const consoleSpy = vi.spyOn(console, 'log');

    wrapper.vm.submitBlockData();

    expect(consoleSpy).toHaveBeenCalledWith([
      { blockType: 'text', order: 1, text: 'Text block value' },
      { blockType: 'image', order: 2, imageUrl: defines.blockImages[0] },
    ]);
  });

  it('does not duplicate or remove blocks when there are no blocks to modify', () => {
    const wrapper = mount(AppComponent);

    // trigger duplicate and remove
    wrapper.vm.duplicateComp(0);
    wrapper.vm.removeComp(0);

    // assert no change
    expect(wrapper.vm.addedBlocks.length).toBe(0);
  });
});
