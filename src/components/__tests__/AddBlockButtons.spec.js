import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AddBlockButtons from '@/components/AddBlockButtons.vue';

describe('AddBlockButtons', () => {
  it('emits "addBlock" with "text" when the first button is clicked', async () => {
    const wrapper = mount(AddBlockButtons);

    const textButton = wrapper.findAll('button')[0];

    await textButton.trigger('click');

    expect(wrapper.emitted('addBlock')).toBeTruthy();
    expect(wrapper.emitted('addBlock')[0]).toEqual(['text']);
  });

  it('emits "addBlock" with "image" when the second button is clicked', async () => {
    const wrapper = mount(AddBlockButtons);

    const imageButton = wrapper.findAll('button')[1];

    await imageButton.trigger('click');

    expect(wrapper.emitted('addBlock')).toBeTruthy();
    expect(wrapper.emitted('addBlock')[0]).toEqual(['image']);
  });
});
