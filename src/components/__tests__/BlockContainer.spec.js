import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BlockContainer from '@/components/BlockContainer.vue';
import TextBlock from '@/components/TextBlock.vue';
import ImageBlock from '@/components/ImageBlock.vue';
import BlockOptions from '@/components/BlockOptions.vue';

const observeMock = vi.fn();
const disconnectMock = vi.fn();
globalThis.MutationObserver = vi.fn().mockImplementation((callback) => {
  callback();
  return {
    observe: observeMock,
    disconnect: disconnectMock,
  };
});

describe('BlockContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('show placeholder when modelValue is empty', () => {
    const wrapper = mount(BlockContainer, {
      props: { modelValue: [], placeholder: 'This is the placeholder' },
    });

    expect(wrapper.html()).toContain('This is the placeholder');
  });

  it('hide placeholder when modelValue contains data', () => {
    const wrapper = mount(BlockContainer, {
      props: {
        modelValue: [{ type: 'image', value: 'image-url.jpg' }],
        placeholder: 'This is the placeholder',
      },
    });

    expect(wrapper.html()).not.toContain('This is the placeholder');
  });

  it('hide placeholder when modelValue contains data but flag is disabled', async () => {
    const wrapper = mount(BlockContainer, {
      props: { modelValue: [], placeholder: 'This is the placeholder' },
    });

    wrapper.vm.disablePlaceholder = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain('This is the placeholder');
  });

  it('set placeholder show flag to true when no blocks added - mutation observer', async () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(document.createElement('div'));

    const wrapper = mount(BlockContainer, {
      props: {
        modelValue: [],
        placeholder: 'some-placeholder',
      },
    });

    expect(observeMock).toHaveBeenCalledOnce();
    expect(wrapper.vm.disablePlaceholder).toBe(false);
  });

  it('set placeholder show flag to false when blocks exists - mutation observer', async () => {
    const mockElement = document.createElement('div');
    mockElement.classList.add('draggable-list', 'with-placeholder');

    const child1 = document.createElement('div');
    child1.classList.add('sortable-block');

    const child2 = document.createElement('div');
    child1.classList.add('sortable-block');

    mockElement.appendChild(child1);
    mockElement.appendChild(child2);

    vi.spyOn(document, 'querySelector').mockReturnValue(mockElement);

    const wrapper = mount(BlockContainer, {
      props: {
        modelValue: [],
        placeholder: 'some-placeholder',
      },
    });

    expect(observeMock).toHaveBeenCalledOnce();
    expect(wrapper.vm.disablePlaceholder).toBe(true);
  });

  it('should observe mutation observer on mount and disable on unmount', async () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(document.createElement('div'));

    const wrapper = mount(BlockContainer, {
      props: {
        modelValue: [],
        placeholder: 'some-placeholder',
      },
    });

    expect(observeMock).toHaveBeenCalledOnce();

    wrapper.unmount();

    expect(disconnectMock).toHaveBeenCalledOnce();
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
          { type: 'text', value: 'Sample Text 2' },
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

  it('toggle placeholder visibility', () => {
    const wrapper = mount(BlockContainer, {
      props: {
        modelValue: [],
        displayCompOptions: false,
        placeholder: 'This is the placeholder',
      },
    });

    expect(wrapper.text()).toContain('This is the placeholder');
  });
});
