import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BlockContainer from '@/components/BlockContainer.vue';
import TextBlock from '@/components/TextBlock.vue';
import ImageBlock from '@/components/ImageBlock.vue';
import BlockOptions from '@/components/BlockOptions.vue';

describe('BlockContainer', () => {
  it('renders empty state when modelValue is empty', () => {
    const wrapper = mount(BlockContainer, {
      props: { modelValue: [] },
    });

    expect(wrapper.html()).toContain('Drag and drop components here.');
  });

  it('renders text block when element type is text', () => {
    const wrapper = mount(BlockContainer, {
      props: { modelValue: [{ type: 'text', value: 'Sample Text' }] },
    });

    const textBlock = wrapper.findComponent(TextBlock);

    expect(textBlock.exists()).toBe(true);
    expect(textBlock.props('text')).toBe('Sample Text');
  });

  it('renders image block when element type is image', () => {
    const wrapper = mount(BlockContainer, {
      props: { modelValue: [{ type: 'image', value: 'image-url.jpg' }] },
    });

    const imageBlock = wrapper.findComponent(ImageBlock);
    expect(imageBlock.exists()).toBe(true);
    expect(imageBlock.props('imageUrl')).toBe('image-url.jpg');
  });

  it('emits duplicate, remove, and edit events from BlockOptions', async () => {
    const wrapper = mount(BlockContainer, {
      props: {
        modelValue: [
          { type: 'text', value: 'Sample Text' },
          { type: 'text', value: 'Sample Text 2' }
        ],
        displayCompOptions: true,
      },
    });

    const blockOptions = wrapper.findAllComponents(BlockOptions);
    expect(blockOptions[1].exists()).toBe(true);

    blockOptions[1].vm.$emit('duplicate');
    blockOptions[1].vm.$emit('remove');
    blockOptions[1].vm.$emit('edit');

    expect(wrapper.emitted()).toHaveProperty('duplicate');
    expect(wrapper.emitted().duplicate[0]).toEqual([1]);

    expect(wrapper.emitted()).toHaveProperty('remove');
    expect(wrapper.emitted().remove[0]).toEqual([1]);

    expect(wrapper.emitted()).toHaveProperty('edit');
    expect(wrapper.emitted().edit[0]).toEqual([1, { type: 'text', value: 'Sample Text 2' }]);
  });

  it('does not render BlockOptions if displayCompOptions is false', () => {
    const wrapper = mount(BlockContainer, {
      props: {
        modelValue: [{ type: 'text', value: 'Sample Text' }],
        displayCompOptions: false,
      },
    });

    const blockOptions = wrapper.findComponent(BlockOptions);
    expect(blockOptions.exists()).toBe(false);
  });
});
