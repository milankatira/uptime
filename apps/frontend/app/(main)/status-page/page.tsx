"use client";
import { Button } from "@/components/ui/button";
import { useWebsites } from "@/hooks/useWebsites";
import { Eye } from "lucide-react";
import React from "react";

/**
 * Displays a table listing available status pages with actions to view each page.
 *
 * Renders a list of websites retrieved from the {@link useWebsites} hook. For each website, shows its URL and ID, and provides a button to open the corresponding status page in a new browser tab. If no websites are available, displays a message indicating that no status pages are found.
 */
function StatusPageList() {
  const { websites } = useWebsites();

  return (
    <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-white">Status pages.</h1>
      </div>

      <div className="bg-dark-lighter border-dark-border overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-dark-border text-muted-foreground border-b text-sm uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites && websites.length > 0 ? (
                websites.map((site) => (
                  <tr
                    key={site.id}
                    className="border-dark-border hover:bg-secondary/10 border-b transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-white">
                            {site.url}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            ID: {site.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-muted-foreground h-8 w-8 hover:text-white"
                          onClick={() =>
                            window.open(
                              `/status-page/${site.id}`,
                              "_blank",
                              "noopener,noreferrer",
                            )
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-muted-foreground p-4 text-center"
                  >
                    No status pages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatusPageList;
