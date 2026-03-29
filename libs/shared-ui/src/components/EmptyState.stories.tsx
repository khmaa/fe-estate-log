import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState, EmptyStateAction } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    title: 'No saved visit notes yet',
    description:
      'Start by adding your first property visit log to build a history of places you explored.',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    badge: 'Getting Started',
    action: <EmptyStateAction>Add first note</EmptyStateAction>,
  },
};

export const FilterResultEmpty: Story = {
  args: {
    badge: 'Search',
    title: 'No properties match your filters',
    description:
      'Try widening the region or adjusting the budget range to see more results.',
    action: (
      <EmptyStateAction variant="secondary">Reset filters</EmptyStateAction>
    ),
  },
};
