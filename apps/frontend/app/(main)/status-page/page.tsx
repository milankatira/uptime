"use client";
import { Button } from "@/components/ui/button";
import { useWebsites } from "@/hooks/useWebsites";
import { useUser } from "@clerk/nextjs";
import { Eye } from "lucide-react";
import React from "react";

function StatusPageList() {
    const { user } = useUser();
    const { websites, loading } = useWebsites(
        user?.primaryEmailAddress?.emailAddress,
    );

    return (
        <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-medium text-white">
                    Status pages.
                </h1>
            </div>

            <div className="bg-dark-lighter border-dark-border overflow-hidden rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-dark-border text-muted-foreground border-b text-sm uppercase tracking-wider">
                                <th className="px-4 py-3 text-left font-semibold">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-dark-border animate-pulse"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="h-4 w-40 rounded bg-gray-700 mb-2" />
                                                    <div className="h-3 w-24 rounded bg-gray-600" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="h-8 w-8 rounded-full bg-gray-700" />
                                        </td>
                                    </tr>
                                ))
                            ) : websites && websites.length > 0 ? (
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
