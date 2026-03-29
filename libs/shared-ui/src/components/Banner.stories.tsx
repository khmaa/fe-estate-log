import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';
import { Button } from './Button';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  args: {
    title: 'Preview environment',
    description: 'This workspace is currently connected to preview data only.',
    variant: 'info',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    title: 'Changes published',
    description:
      'Your latest design system updates are now available in Storybook.',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    title: 'Scheduled maintenance',
    description:
      'The visit log sync service will be unavailable between 2:00 and 3:00 AM.',
    variant: 'warning',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Preview environment',
    description:
      'Some services are mocked in this environment. Review production settings before release.',
    action: (
      <Button variant="secondary" size="sm">
        Review settings
      </Button>
    ),
  },
};
