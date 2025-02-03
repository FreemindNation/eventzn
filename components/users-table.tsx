"use client";

import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Avatar } from "@heroui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  registeredEvents: number;
  createdAt: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        
        const data = await res.json();
      

        if (!Array.isArray(data.users)) {
          console.error("Data is not an array:", data);
          
          return;
        }

        const formattedUsers = data.users.map((user: User) => ({
          id: user.id,
          name: user.name || "Unknown",
          email: user.email || "No Email",
          image: user.image || "/default-avatar.png",
          registeredEvents: user.registeredEvents || 0,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        }));
        
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table aria-label="Users Table">
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Events Signed Up</TableColumn>
          <TableColumn>Date Registered</TableColumn>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell>No users found</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar src={user.image} name={user.name} />
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-center">{user.registeredEvents}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}