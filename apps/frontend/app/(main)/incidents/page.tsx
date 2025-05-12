import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Trash2, X } from "lucide-react";

function IncidentsSection() {
  const incidents = [
    {
      id: 1,
      status: "Ongoing",
      statusColor: "text-red-500",
      errorCode: 500,
      errorBg: "bg-red-900/30",
      errorColor: "text-red-300",
      errorText: "Internal Server Error",
      comments: 0,
      date: "May 16, 2023, 14:44:23 GMT -2",
      duration: "5 min",
    },
    {
      id: 2,
      status: "Resolved",
      statusColor: "text-green-500",
      errorCode: 500,
      errorBg: "bg-red-900/30",
      errorColor: "text-red-300",
      errorText: "Internal Server Error",
      comments: 2,
      date: "May 11, 2023, 04:44:23 GMT -2",
      duration: "5 min",
    },
    {
      id: 3,
      status: "Resolved",
      statusColor: "text-green-500",
      errorCode: 404,
      errorBg: "bg-blue-900/30",
      errorColor: "text-blue-300",
      errorText: "Not found",
      comments: 0,
      date: "May 10, 2023, 15:23:23 GMT -2",
      duration: "5 min",
    },
    {
      id: 4,
      status: "Resolved",
      statusColor: "text-green-500",
      errorCode: 500,
      errorBg: "bg-red-900/30",
      errorColor: "text-red-300",
      errorText: "Internal Server Error",
      comments: 0,
      date: "Apr 10, 2023, 16:01:23 GMT -2",
      duration: "5 min",
    },
    {
      id: 5,
      status: "Resolved",
      statusColor: "text-green-500",
      errorCode: "SLOW",
      errorBg: "bg-yellow-900/30",
      errorColor: "text-yellow-300",
      errorText: "Degraded performance",
      comments: 0,
      date: "Apr 09, 2023, 14:24:23 GMT -2",
      duration: "5 min",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-10 dark:bg-gray-900">
      <h2 className="mb-10 text-2xl font-semibold text-white">Incidents.</h2>

      <Alert className="mb-10 border-indigo-800 bg-indigo-900/40 text-white">
        <AlertCircle className="h-4 w-4 text-white" />
        <AlertDescription className="flex w-full items-center justify-between">
          <div>
            <span className="font-medium">Possible IP Allowlist Issue</span>
            <span className="ml-2 text-gray-300">{`If you're using a firewall, please ensure our new IPs are allowlisted to avoid potential monitoring issues.`}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="link" className="text-white underline">
              Check IP list
            </Button>
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <div className="mb-14 flex flex-col justify-between lg:flex-row">
        <div className="mb-10 lg:mb-0 lg:w-1/3">
          <h1 className="text-4xl font-bold">
            Your <span className="text-green-500">incidents</span>{" "}
            <span className="text-green-500">overview</span> on the way!
          </h1>

          <p className="mt-8 text-gray-300">
            Once we detect some incidents, they will be neatly displayed for
            quick and easy understanding. 🧠
          </p>
        </div>

        <div className="lg:w-2/3">
          <Table className="overflow-hidden rounded-lg border border-gray-800">
            <TableHeader className="bg-gray-900/60">
              <TableRow className="border-b border-gray-800">
                <TableHead className="font-medium text-gray-400">
                  Status
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Monitor
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Root cause
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Comments
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Started
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Duration
                </TableHead>
                <TableHead className="font-medium text-gray-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-gray-900/40">
              {incidents.map((incident) => (
                <TableRow
                  key={incident.id}
                  className="border-b border-gray-800"
                >
                  <TableCell>
                    <div className="flex items-center">
                      {incident.status === "Ongoing" ? (
                        <span className="flex items-center">
                          <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                          <span className={incident.statusColor}>
                            {incident.status}
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                          <span className={incident.statusColor}>
                            {incident.status}
                          </span>
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 rounded bg-gray-800"></div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center ${incident.errorBg} ${incident.errorColor} rounded-md px-2 py-1`}
                    >
                      <span className="mr-2 font-medium">
                        {incident.errorCode}
                      </span>
                      <span className="text-sm">{incident.errorText}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">
                      {incident.comments} comments
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-300">{incident.date}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">{incident.duration}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-300"
                    >
                      <Trash2 className="h-4 w-4" />
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

export default IncidentsSection;
