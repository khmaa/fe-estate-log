import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./Popover";

const meta = {
  title: "Components/Popover",
  component: PopoverContent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PopoverContent>;

type Story = StoryObj<typeof meta>;

const FilterPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open filters</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Quick filters
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Use a popover when the content is richer than a menu but lighter
              than a dialog.
            </p>
          </div>
          <div className="space-y-2 rounded-ui border border-border bg-background px-4 py-3">
            <p className="text-sm font-medium text-foreground">Suggested</p>
            <p className="text-sm text-muted-foreground">
              Apartments, under 1B KRW, and within 10 minutes of transit.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <PopoverClose asChild>
              <Button variant="ghost">Close</Button>
            </PopoverClose>
            <Button>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default meta;

export const Default: Story = {
  render: () => <FilterPopover />,
};

export const CompactContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">
            Design system note
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Popovers work well for contextual help, quick filters, and small
            side actions.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
