"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";

import UsersTable from "@/components/users-table";

export default function UsersPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Users</h2>
        </CardHeader>
        <CardBody>
          <UsersTable />
        </CardBody>
      </Card>
    </div>
  );
}
