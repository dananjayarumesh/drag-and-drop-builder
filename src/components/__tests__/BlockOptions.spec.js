import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BlockOptions from '@/components/BlockOptions.vue';

describe('ButtonGroupComponent', () => {
  it('emits the "duplicate" event when the duplicate button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const duplicateButton = wrapper.find('button.bg-green-600');

    await duplicateButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('duplicate');
    expect(wrapper.emitted().duplicate).toHaveLength(1);
  });

  it('emits the "edit" event when the edit button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const editButton = wrapper.find('button.bg-blue-600');

    await editButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('edit');
    expect(wrapper.emitted().edit).toHaveLength(1);
  });

  it('emits the "remove" event when the remove button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const removeButton = wrapper.find('button.bg-red-600');

    await removeButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('remove');
    expect(wrapper.emitted().remove).toHaveLength(1);
  });

  it('has the correct classes for hover opacity', () => {
    const wrapper = mount(BlockOptions);
    const div = wrapper.find('div');

    expect(div.classes()).toContain('opacity-0');
    expect(div.classes()).toContain('group-hover:opacity-100');
  });
});
