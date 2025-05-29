"use client";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

interface Website {
    interval: number;
    id: string;
    url: string;
    ticks: {
        id: string;
        createdAt: string;
        status: string;
        latency: number;
    }[];
}

export function useWebsites() {
    const instance = useAxiosInstance();
    const [websites, setWebsites] = useState<Website[]>([]);

    async function refreshWebsites() {
        const response = await instance.get("/api/v1/websites");
        setWebsites(response.data.websites);
    }

    useEffect(() => {
        refreshWebsites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { websites, refreshWebsites };
}
