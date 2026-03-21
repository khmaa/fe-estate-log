import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <Field
        htmlFor="storybook-region"
        label="Region"
        helperText="Select the main area you are exploring."
      >
        <Select id="storybook-region" defaultValue="">
          <option value="" disabled>
            Select a region
          </option>
          <option value="seoul">Seoul</option>
          <option value="gyeonggi">Gyeonggi</option>
          <option value="incheon">Incheon</option>
        </Select>
      </Field>
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="max-w-sm">
      <Field htmlFor="storybook-budget" label="Budget range">
        <Select id="storybook-budget" defaultValue="mid">
          <option value="low">Under 300M KRW</option>
          <option value="mid">300M - 700M KRW</option>
          <option value="high">700M KRW and above</option>
        </Select>
      </Field>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm">
      <Field htmlFor="storybook-disabled-select" label="Visit status">
        <Select
          id="storybook-disabled-select"
          defaultValue="scheduled"
          disabled
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="skipped">Skipped</option>
        </Select>
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="max-w-sm">
      <Field
        htmlFor="storybook-property-type"
        label="Property type"
        error="Please select a property type."
      >
        <Select
          id="storybook-property-type"
          defaultValue=""
          aria-invalid="true"
        >
          <option value="" disabled>
            Select a property type
          </option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="office-tel">Officetel</option>
        </Select>
      </Field>
    </div>
  ),
};
