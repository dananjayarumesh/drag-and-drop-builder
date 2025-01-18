import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import EditDialog from '@/components/EditDialog.vue'; // Replace with the correct path to your component
import TextBlockEdit from '@/components/TextBlockEdit.vue';
import ImageBlockEdit from '@/components/ImageBlockEdit.vue';

vi.mock('@/components/TextBlockEdit.vue', () => ({
  default: {
    name: 'TextBlockEdit',
    props: {
      initText: {
        type: String,
        required: true,
      },
    },
    emits: ['submit', 'cancel'],
    template: '<div>{{ initText }}</div>'
  }
}));

vi.mock('@/components/ImageBlockEdit.vue', () => ({
  default: {
    name: 'ImageBlockEdit',
    props: {
      initSelected: {
        type: String,
        required: true,
      },
    },
    emits: ['submit', 'cancel'],
    template: '<div>{{ initSelected }}</div>'
  }
}));

describe('EditDialog', () => {
  it('renders the dialog when "show" is true', () => {
    const wrapper = mount(EditDialog, {
      props: {
        show: true,
        blockData: { type: 'text', value: 'Sample Text' },
      },
      global: {
        stubs: { TransitionRoot: true, TransitionChild: true, Dialog: true, DialogPanel: true },
      },
    });

    expect(wrapper.find('.relative.z-10').exists()).toBe(true);
  });

  it('does not render the dialog when "show" is false', () => {
    const wrapper = mount(EditDialog, {
      props: {
        show: false,
        blockData: { type: 'text', value: 'Sample Text' },
      },
      global: {
        stubs: { TransitionRoot: true, TransitionChild: true, Dialog: true, DialogPanel: true },
      },
    });

    expect(wrapper.find('.relative.z-10').exists()).toBe(false);
  });

  it('renders TextBlockEdit when blockData.type is "text"', () => {
    const wrapper = mount(EditDialog, {
      props: {
        show: true,
        blockData: { type: 'text', value: 'Sample Text' },
      },
      global: {
        stubs: {
          TransitionRoot: true, 
          TransitionChild: true,
          Dialog: {
            template: '<div><slot /></div>',
          },
          DialogPanel: {
            template: '<div><slot /></div>',
          },
        },
      },
    });

    const textBlockEdit = wrapper.findComponent(TextBlockEdit);
    expect(textBlockEdit.exists()).toBe(true);
    expect(textBlockEdit.props('initText')).toBe('Sample Text');
  });

  it('renders ImageBlockEdit when blockData.type is "image"', () => {
    const wrapper = mount(EditDialog, {
      props: {
        show: true,
        blockData: { type: 'image', value: 'sample-image.jpg' },
      },
      global: {
        stubs: {
          TransitionRoot: true,
          TransitionChild: true,
          Dialog: {
            template: '<div><slot /></div>',
          },
          DialogPanel: {
            template: '<div><slot /></div>',
          },
        },
      },
    });

    const imageBlockEdit = wrapper.findComponent(ImageBlockEdit);
    expect(imageBlockEdit.exists()).toBe(true);
    expect(imageBlockEdit.props('initSelected')).toBe('sample-image.jpg');
  });

  it('emits "submit" and "closed" events when submitValue is called', async () => {
    const wrapper = mount(EditDialog, {
      props: {
        show: true,
        blockData: { type: 'text', value: 'Sample Text' },
      },
      global: {
        stubs: {
          TransitionRoot: true,
          TransitionChild: true,
          Dialog: {
            template: '<div><slot /></div>',
          },
          DialogPanel: {
            template: '<div><slot /></div>',
          },
        },
      },
    });

    const textBlockEdit = wrapper.findComponent(TextBlockEdit);
    textBlockEdit.vm.$emit('submit', 'New Text');

    expect(wrapper.emitted()).toHaveProperty('submit');
    expect(wrapper.emitted().submit[0]).toEqual(['New Text']);
    expect(wrapper.emitted()).toHaveProperty('closed');
  });

  it('emits "closed" event when cancel is called', async () => {
    const wrapper = mount(EditDialog, {
      props: {
        show: true,
        blockData: { type: 'text', value: 'Sample Text' },
      },
      global: {
        stubs: {
          TransitionRoot: true,
          TransitionChild: true,
          Dialog: {
            template: '<div><slot /></div>',
          },
          DialogPanel: {
            template: '<div><slot /></div>',
          },
        },
      },
    });

    const textBlockEdit = wrapper.findComponent(TextBlockEdit);
    textBlockEdit.vm.$emit('cancel');

    expect(wrapper.emitted()).toHaveProperty('closed');
    expect(wrapper.emitted().closed.length).toBe(1);
  });
});
