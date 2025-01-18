import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BlockOptions from '@/components/BlockOptions.vue';

describe('ButtonGroupComponent', () => {
  it('emits the "duplicate" event when the duplicate button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const duplicateButton = wrapper.findAll('button')[0];

    await duplicateButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('duplicate');
    expect(wrapper.emitted().duplicate).toHaveLength(1);
  });

  it('emits the "edit" event when the edit button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const editButton = wrapper.findAll('button')[1];

    await editButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('edit');
    expect(wrapper.emitted().edit).toHaveLength(1);
  });

  it('emits the "remove" event when the remove button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const removeButton = wrapper.findAll('button')[2];

    await removeButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('remove');
    expect(wrapper.emitted().remove).toHaveLength(1);
  });

  it('emits the "moveDown" event when the moveDown button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const removeButton = wrapper.findAll('button')[3];

    await removeButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('moveDown');
    expect(wrapper.emitted().moveDown).toHaveLength(1);
  });

  it('emits the "moveUp" event when the moveUp button is clicked', async () => {
    const wrapper = mount(BlockOptions);
    const removeButton = wrapper.findAll('button')[4];

    await removeButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('moveUp');
    expect(wrapper.emitted().moveUp).toHaveLength(1);
  });

  it('has the correct classes for hover opacity', () => {
    const wrapper = mount(BlockOptions);
    const div = wrapper.find('div');

    expect(div.classes()).toContain('opacity-0');
    expect(div.classes()).toContain('group-hover:opacity-100');
  });
});
