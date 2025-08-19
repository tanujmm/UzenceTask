import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 24 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  args: {
    data,
    columns,
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const Empty: Story = {
  args: { data: [] },
};

export const Selectable: Story = {
  args: {
    selectable: true,

    data: [{
      "id": 1,
      "name": "Marsh",
      "email": "alice@example.com",
      "age": 24
    }, {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com",
      "age": 30
    }, {
      "id": 3,
      "name": "Charlie",
      "email": "charlie@example.com",
      "age": 28
    }]
  },
};
