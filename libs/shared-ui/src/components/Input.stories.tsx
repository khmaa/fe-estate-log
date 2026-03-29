import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { Label } from './Label';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    type: 'text',
    placeholder: 'Enter text',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Prefilled value',
    readOnly: true,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'hello@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="storybook-email">Email address</Label>
      <Input
        {...args}
        id="storybook-email"
        type="email"
        placeholder="hello@example.com"
      />
    </div>
  ),
};
