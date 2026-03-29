import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  args: {
    children: 'Email address',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    children: 'Optional field',
    className: 'text-muted-foreground',
  },
};

export const Required: Story = {
  render: (args) => (
    <div className="inline-flex items-center gap-1">
      <Label {...args} />
      <span className="text-sm font-semibold text-primary">*</span>
    </div>
  ),
};
