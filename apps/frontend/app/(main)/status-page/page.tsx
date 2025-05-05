import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusPage = {
  id: string;
  name: string;
  description: string;
  accessLevel: "Public" | "Private" | "Team";
  status: "Published" | "Draft" | "Maintenance";
};

const statusPages: StatusPage[] = [
  {
    id: "1",
    name: "Status page",
    description: "All monitors",
    accessLevel: "Public",
    status: "Published",
  },
];

function StatusPageList() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-white">Status pages.</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          Create Status page
        </Button>
      </div>

      <div className="bg-dark-lighter rounded-lg border border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border text-sm text-muted-foreground">
                <th className="py-3 px-4 text-left font-normal">Name</th>
                <th className="py-3 px-4 text-left font-normal">Access level</th>
                <th className="py-3 px-4 text-left font-normal">Status</th>
                <th className="py-3 px-4 text-left font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {statusPages.map((page) => (
                <tr key={page.id} className="border-b border-dark-border hover:bg-secondary/10">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center">
                        <span className="text-xs text-emerald-500">⚫</span>
                      </div>
                      <div>
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-muted-foreground">{page.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                      <span>{page.accessLevel}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                    ${page.status === "Published" ? "bg-purple-900/30 text-status-published" :
                      page.status === "Draft" ? "bg-gray-700/30 text-gray-300" :
                      "bg-orange-900/30 text-orange-400"}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatusPageList;