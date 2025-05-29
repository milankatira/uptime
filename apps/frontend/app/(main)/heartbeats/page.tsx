"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Heartbeat {
    id: string;
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const HeartbeatsPage = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [heartbeats, setHeartbeats] = useState<Heartbeat[]>([]);
    const [filteredHeartbeats, setFilteredHeartbeats] = useState<Heartbeat[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const instance = useAxiosInstance();

    useEffect(() => {
        const fetchHeartbeats = async () => {
            try {
                const response = await instance.get("/api/v1/heartbeat");
                setHeartbeats(response.data);
                setFilteredHeartbeats(response.data);
            } catch (error) {
                console.error("Failed to fetch heartbeats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeartbeats();
    }, [instance]);

    useEffect(() => {
        const filtered = heartbeats.filter((heartbeat) =>
            heartbeat.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredHeartbeats(filtered);
    }, [searchQuery, heartbeats]);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-white dark:bg-gray-900">
                <div className="max-w-full p-6 md:p-8">
                    <div className="mb-10 flex items-center justify-between">
                        <div className="h-9 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="h-10 w-[300px] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                            </div>
                            <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100/50 dark:border-gray-700 dark:bg-gray-800/50">
                        <div className="flex items-center px-6 py-4">
                            <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />
                            <div className="ml-2 h-4 w-24 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-600" />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between px-6 py-4"
                                >
                                    <div className="flex items-center">
                                        <div className="mr-4 h-2 w-2 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />
                                        <div>
                                            <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-600" />
                                            <div className="mt-2 h-3 w-32 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-600" />
                                        </div>
                                    </div>
                                    <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-900">
            <div className="max-w-full p-6 md:p-8">
                <div className="mb-10 flex items-center justify-between">
                    <h1 className="flex items-center justify-center gap-4 text-2xl font-semibold text-gray-900 dark:text-white">
                        Heartbeats{" "}
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            {filteredHeartbeats.length}
                        </span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search"
                                className="w-[300px] border-gray-300 pl-9 text-gray-900 dark:border-gray-700 dark:text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400">
                                /
                            </div>
                        </div>
                        <Link href="/heartbeats/create">
                            <Button>Create heartbeat</Button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100/50 dark:border-gray-700 dark:bg-gray-800/50">
                    <div
                        className="flex cursor-pointer items-center px-6 py-4 hover:bg-gray-200/50 dark:hover:bg-gray-700/30"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <svg
                            className={`mr-2 h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        <span className="text-gray-900 dark:text-white">
                            Heartbeats
                        </span>
                    </div>

                    {isExpanded && (
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {filteredHeartbeats.map((heartbeat) => (
                                <Link
                                    href={`heartbeats/${heartbeat.id}`}
                                    key={heartbeat.id}
                                >
                                    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-200/50 dark:hover:bg-gray-700/30">
                                        <div className="flex items-center">
                                            <div className="mr-4 h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                                            <div>
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {heartbeat.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-2 text-sm text-gray-400">
                                                <span className="inline-flex items-center">
                                                    <svg
                                                        className="mr-1 h-4 w-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            strokeWidth="2"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeWidth="2"
                                                            d="M12 6v6l4 2"
                                                        />
                                                    </svg>
                                                    {new Date(
                                                        heartbeat.updatedAt,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="text-gray-400">
                                                <svg
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="1"
                                                    />
                                                    <circle
                                                        cx="19"
                                                        cy="12"
                                                        r="1"
                                                    />
                                                    <circle
                                                        cx="5"
                                                        cy="12"
                                                        r="1"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeartbeatsPage;
