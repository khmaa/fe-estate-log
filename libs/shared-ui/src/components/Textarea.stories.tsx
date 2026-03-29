import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    placeholder: 'Add more details',
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Prefilled textarea content',
  },
};

export const Resizable: Story = {
  args: {
    className: 'resize-y',
    placeholder: 'Drag the corner to resize',
  },
};
