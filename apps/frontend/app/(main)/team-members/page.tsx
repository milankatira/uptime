import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TeamMembersSection() {
  const teamMembers = [
    {
      id: 1,
      name: "John Appleseed",
      status: "Active",
      role: "Admin",
      phone: "555-123-4567",
      tfa: "Enabled",
    },
    {
      id: 2,
      name: "Natalie Mayers",
      status: "Active",
      role: "Editor",
      phone: "555-234-5678",
      tfa: "Enabled",
    },
    {
      id: 3,
      name: "Sung Lee",
      status: "Active",
      role: "Viewer",
      phone: "555-345-6789",
      tfa: "Disabled",
    },
    {
      id: 4,
      name: "Marcus Babic",
      status: "Pending",
      role: "Editor",
      phone: "555-456-7890",
      tfa: "Disabled",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-10 dark:bg-gray-900">
      <h2 className="mb-12 text-2xl font-semibold text-white">Team members.</h2>

      <div className="mb-14 flex flex-col justify-between lg:flex-row">
        <div className="mb-10 lg:mb-0 lg:w-1/3">
          <h1 className="text-4xl font-bold">
            Invite your <span className="text-green-500">team members</span>!
          </h1>

          <div className="mt-8 space-y-6">
            <p className="flex items-start gap-2 text-gray-300">
              <span className="text-lg text-yellow-400">👍</span>
              Solve incidents faster, together. Keep every team member in the
              loop with their own access. Available in our Team and Enterprise
              plans.
            </p>

            <p className="flex items-start gap-2 text-gray-300">
              <span className="text-lg text-yellow-400">🔔</span>
              Notify anyone without sharing your account with Notify-only seats,
              available even in Solo plans (sold separately).
            </p>

            <div className="mt-8">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                See plans
              </Button>
              <span className="ml-4 text-sm text-gray-400">
                Plans start at $7 / month. 10-day money-back guarantee included!
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <Table className="overflow-hidden rounded-lg border border-gray-800">
            <TableHeader className="bg-gray-900">
              <TableRow className="border-b border-gray-800">
                <TableHead className="py-3 font-medium text-gray-400">
                  Name and e-mail
                </TableHead>
                <TableHead className="py-3 font-medium text-gray-400">
                  Phone number
                </TableHead>
                <TableHead className="py-3 font-medium text-gray-400">
                  Role
                </TableHead>
                <TableHead className="py-3 font-medium text-gray-400">
                  2FA
                </TableHead>
                <TableHead className="py-3 font-medium text-gray-400">
                  Status
                </TableHead>
                <TableHead className="py-3 font-medium text-gray-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-gray-900/80">
              {teamMembers.map((member) => (
                <TableRow key={member.id} className="border-b border-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="text-gray-100">{member.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-400">
                      {member.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-400">
                      {member.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`rounded-md px-3 py-1 text-sm ${
                        member.tfa === "Enabled"
                          ? "bg-indigo-900/50 text-indigo-300"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {member.tfa}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`rounded-md px-3 py-1 text-sm ${
                        member.status === "Active"
                          ? "bg-green-900/30 text-green-300"
                          : "bg-yellow-900/30 text-yellow-300"
                      }`}
                    >
                      {member.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
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
