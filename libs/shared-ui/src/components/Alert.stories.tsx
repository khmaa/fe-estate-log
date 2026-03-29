import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    variant: 'info',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderAlert = (
  variant: 'info' | 'success' | 'warning' | 'error',
  title: string,
  description: string,
) => (
  <div className="max-w-xl">
    <Alert variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  </div>
);

export const Info: Story = {
  render: () =>
    renderAlert(
      'info',
      'Heads up',
      'Property listings in this area were updated 10 minutes ago.',
    ),
};

export const Success: Story = {
  render: () =>
    renderAlert(
      'success',
      'Saved successfully',
      'Your visit note was saved and is now available in the activity log.',
    ),
};

export const Warning: Story = {
  render: () =>
    renderAlert(
      'warning',
      'Incomplete information',
      'Some fields are still missing, so your summary may not be ready to share yet.',
    ),
};

export const Error: Story = {
  render: () =>
    renderAlert(
      'error',
      'Submission failed',
      'We could not save your request. Check the highlighted fields and try again.',
    ),
};
