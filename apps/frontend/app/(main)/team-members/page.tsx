import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function TeamMembersSection() {
  const teamMembers = [
    { id: 1, name: "John Appleseed", status: "Active", role: "Admin", phone: "555-123-4567", tfa: "Enabled" },
    { id: 2, name: "Natalie Mayers", status: "Active", role: "Editor", phone: "555-234-5678", tfa: "Enabled" },
    { id: 3, name: "Sung Lee", status: "Active", role: "Viewer", phone: "555-345-6789", tfa: "Disabled" },
    { id: 4, name: "Marcus Babic", status: "Pending", role: "Editor", phone: "555-456-7890", tfa: "Disabled" },
  ];

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 w-full min-h-screen p-10">
      <h2 className="text-2xl font-semibold text-white mb-12">Team members.</h2>

      <div className="flex flex-col lg:flex-row justify-between mb-14">
        <div className="lg:w-1/3 mb-10 lg:mb-0">
          <h1 className="text-4xl font-bold">
            Invite your <span className="text-green-500">team members</span>!
          </h1>

          <div className="mt-8 space-y-6">
            <p className="text-gray-300 flex items-start gap-2">
              <span className="text-yellow-400 text-lg">👍</span>
              Solve incidents faster, together. Keep every team member in the loop with their own access. Available in our Team and Enterprise plans.
            </p>

            <p className="text-gray-300 flex items-start gap-2">
              <span className="text-yellow-400 text-lg">🔔</span>
              Notify anyone without sharing your account with Notify-only seats, available even in Solo plans (sold separately).
            </p>

            <div className="mt-8">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                See plans
              </Button>
              <span className="ml-4 text-sm text-gray-400">
                Plans start at $7 / month. 10-day money-back guarantee included!
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <Table className="border border-gray-800 rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-900">
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400 font-medium py-3">Name and e-mail</TableHead>
                <TableHead className="text-gray-400 font-medium py-3">Phone number</TableHead>
                <TableHead className="text-gray-400 font-medium py-3">Role</TableHead>
                <TableHead className="text-gray-400 font-medium py-3">2FA</TableHead>
                <TableHead className="text-gray-400 font-medium py-3">Status</TableHead>
                <TableHead className="text-gray-400 font-medium py-3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-gray-900/80">
              {teamMembers.map((member) => (
                <TableRow key={member.id} className="border-b border-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="text-gray-100">{member.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="bg-gray-800 text-gray-400 px-3 py-1 rounded-md text-sm">
                      {member.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="bg-gray-800 text-gray-400 px-3 py-1 rounded-md text-sm">
                      {member.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`px-3 py-1 rounded-md text-sm ${
                      member.tfa === "Enabled" ? "bg-indigo-900/50 text-indigo-300" : "bg-gray-800 text-gray-400"
                    }`}>
                      {member.tfa}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`px-3 py-1 rounded-md text-sm ${
                      member.status === "Active" ? "bg-green-900/30 text-green-300" : "bg-yellow-900/30 text-yellow-300"
                    }`}>
                      {member.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default TeamMembersSection;