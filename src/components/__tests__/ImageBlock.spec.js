import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ImageBlock from '@/components/ImageBlock.vue'; // Update the path as necessary

describe('ImageBlock', () => {
  it('renders with the correct image URL', () => {
    const imageUrl = 'https://example.com/image.jpg';

    const wrapper = mount(ImageBlock, {
      props: {
        imageUrl,
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(imageUrl);
  });
});
