import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenuContent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DropdownMenuContent>;

type Story = StoryObj<typeof meta>;

const DefaultMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Record actions</DropdownMenuLabel>
        <DropdownMenuItem>Open detail</DropdownMenuItem>
        <DropdownMenuItem>Edit draft</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem className="text-danger focus:bg-danger-soft/50">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ManagementMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Property actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuItem>Assign owner</DropdownMenuItem>
        <DropdownMenuItem>Move to archive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
        <DropdownMenuItem className="text-danger focus:bg-danger-soft/50">
          Remove from project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default meta;

export const Default: Story = {
  render: () => <DefaultMenu />,
};

export const WithSections: Story = {
  render: () => <ManagementMenu />,
};
