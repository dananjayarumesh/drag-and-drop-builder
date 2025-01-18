import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TopBar from '@/components/TopBar.vue';

describe('DragDropEditor.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(TopBar);

    const heading = wrapper.find('p.text-lg');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Drag & Drop Editor');

    const button = wrapper.find('button.bg-green-500');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Save Changes');
  });

  it('emits the "save" event when the button is clicked', async () => {
    const wrapper = mount(TopBar);

    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('save');
    expect(wrapper.emitted('save').length).toBe(1);
  });
});
