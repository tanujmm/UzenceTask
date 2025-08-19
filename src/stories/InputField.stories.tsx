import type { Meta, StoryObj } from "@storybook/react";
import  InputField  from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    placeholder: "Enter text...",
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;


export const Default: Story = {
  args: {
    label: "Default Input",
    variant: "ghost",
    size: "lg",
    type: "",
    invalid: true,
    placeholder: "Enter the value...",
    disabled: false,
    clearable: false
  },
};

// Extra stories for comparison
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <InputField label="Filled" variant="filled" placeholder="Filled input" />
      <InputField label="Outlined" variant="outlined" placeholder="Outlined input" />
      <InputField label="Ghost" variant="ghost" placeholder="Ghost input" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <InputField label="Small" size="sm" variant="outlined" placeholder="Small input" />
      <InputField label="Medium" size="md" variant="outlined" placeholder="Medium input" />
      <InputField label="Large" size="lg" variant="outlined" placeholder="Large input" />
    </div>
  ),
};

export const ErrorAndHelper: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <InputField
        label="With Helper"
        helperText="This is a helper text"
        variant="outlined"
        placeholder="Type something..."
      />
      <InputField
        label="With Error"
        invalid
        errorMessage="Something went wrong"
        variant="outlined"
        placeholder="Invalid input"
      />
    </div>
  ),
};

export const PasswordAndClearable: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <InputField
        label="Password"
        type="password"
        passwordToggle
        placeholder="Enter password"
      />
      <InputField
        label="Clearable Input"
        clearable
        placeholder="Type and clear"
      />
    </div>
  ),
};
