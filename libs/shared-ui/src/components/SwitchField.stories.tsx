import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwitchField } from './SwitchField';

const meta = {
  title: 'Components/SwitchField',
  component: SwitchField,
  args: {
    label: 'Release notifications',
  },
  decorators: [
    (Story) => (
      <div className="w-96 rounded-ui border border-border bg-background p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SwitchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: 'Receive a digest when shared UI changes.',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    helperText: 'Release notifications are enabled.',
  },
};

export const WithError: Story = {
  args: {
    error: 'Choose a notification preference.',
  },
};

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    helperText: 'This preference is managed by your organization.',
  },
};
