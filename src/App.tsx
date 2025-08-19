import React, { useState } from "react";
// import { InputField } from "./InputField";
import InputField from "./components/InputField";
import { DataTable } from "./components/DataTable";
import type { Column } from "./components/DataTable";


interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const userColumns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 24 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">React Assignment Components</h1>


      <div className="space-y-4">
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="We'll never share your email."
          variant="outlined"
          clearable
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          passwordToggle
          invalid={password.length > 0 && password.length < 6}
          errorMessage="Password must be at least 6 characters"
        />
      </div>


      <div className="space-y-2">
        <h2 className="text-lg font-semibold">User Table</h2>
        <DataTable<User>
          data={sampleData}
          columns={userColumns}
          selectable
          onRowSelect={setSelectedUsers}
        />

        <div className="text-sm text-gray-600">
          <strong>Selected Users:</strong>{" "}
          {selectedUsers.map((u) => u.name).join(", ") || "None"}
        </div>
      </div>
    </div>
  );
}

export default App;

