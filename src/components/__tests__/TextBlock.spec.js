import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TextBlock from '@/components/TextBlock.vue';

describe('TextBlock', () => {
  it('renders the correct text when the "text" prop is passed', () => {
    const testText = 'This is a test text';

    const wrapper = mount(TextBlock, {
      props: {
        text: testText,
      },
    });

    expect(wrapper.text()).toContain(testText);
  });

  it('renders an empty string when no "text" prop is passed', () => {
    const wrapper = mount(TextBlock);

    expect(wrapper.text()).toBe('');
  });
});
