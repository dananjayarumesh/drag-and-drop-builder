import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ImageBlockEdit from '@/components/ImageBlockEdit.vue';

vi.mock('@/defines.js', () => ({
  default: {
    blockImages: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
    ],
  }
}));

describe('ImageBlockEdit', () => {
  it('renders with the correct default image', () => {
    const initSelected = 'https://example.com/image1.jpg';

    const wrapper = mount(ImageBlockEdit, {
      props: {
        initSelected,
      },
      global: {
        stubs: { DialodTitle: true },
      }
    });

    const images = wrapper.findAll('img');
    expect(images).toHaveLength(4);
    const selectedImage = wrapper.find('img[src="https://example.com/image1.jpg"]');
    expect(selectedImage.exists()).toBe(true);
  });

  it('sets the correct selected image when clicked', async () => {
    const initSelected = 'https://example.com/image1.jpg';

    const wrapper = mount(ImageBlockEdit, {
      props: {
        initSelected,
      },
      global: {
        stubs: { DialodTitle: true },
      }
    });

    const secondImage = wrapper.findAll('img').at(1);
    await secondImage.trigger('click');

    expect(wrapper.vm.selectedImage).toBe('https://example.com/image2.jpg');
  });

  it('emits the correct submit event with the selected image', async () => {
    const initSelected = 'https://example.com/image1.jpg';

    const wrapper = mount(ImageBlockEdit, {
      props: {
        initSelected,
      },
      global: {
        stubs: { DialodTitle: true },
      },
    });

    const secondImage = wrapper.findAll('img').at(1);
    await secondImage.trigger('click');

    const saveButton = wrapper.find('button[type="button"]:first-child');
    await saveButton.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')[0]).toEqual(['https://example.com/image2.jpg']);
  });

  it('emits cancel event when cancel button is clicked', async () => {
    const initSelected = 'https://example.com/image1.jpg';

    const wrapper = mount(ImageBlockEdit, {
      props: {
        initSelected,
      },
    });

    const cancelButton = wrapper.find('button[type="button"]:last-child');
    await cancelButton.trigger('click');

    expect(wrapper.emitted('cancel')).toHaveLength(1);
  });
});
