import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TextBlockEdit from '@/components/TextBlockEdit.vue';

describe('TextBlockEdit', () => {
  it('initializes with the correct text from the "initText" prop', () => {
    const initText = 'Initial text content';

    const wrapper = mount(TextBlockEdit, {
      props: {
        initText,
      },
      global: {
        stubs: { DialogTitle: true },
      },
    });

    const textarea = wrapper.find('textarea');
    expect(textarea.element.value).toBe(initText);
  });

  it('emits "submit" event with the updated text when Save button is clicked', async () => {
    const initText = 'Initial text content';
    const newText = 'Updated text content';

    const wrapper = mount(TextBlockEdit, {
      props: {
        initText,
      },
      global: {
        stubs: { DialogTitle: true },
      },
      emit: ['submit'],
    });

    const textarea = wrapper.find('textarea');
    await textarea.setValue(newText);

    const saveButton = wrapper.find('button[type="button"]:first-child');
    await saveButton.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')[0]).toEqual(['Updated text content']);
  });

  it('emits "cancel" event when Cancel button is clicked', async () => {
    const initText = 'Initial text content';

    const wrapper = mount(TextBlockEdit, {
      props: {
        initText,
      },
      global: {
        stubs: { DialogTitle: true },
      },
      emit: ['cancel'],
    });

    const cancelButton = wrapper.find('button[type="button"]:last-child');
    await cancelButton.trigger('click');

    expect(wrapper.emitted('cancel')).toHaveLength(1);
  });
});
