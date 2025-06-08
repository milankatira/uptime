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

export function useWebsites(email?: string) {
    const instance = useAxiosInstance();
    const [websites, setWebsites] = useState<Website[]>([]);
    const [loading, setLoading] = useState(false);

    async function refreshWebsites() {
        if (!email) return;
        setLoading(true);
        try {
            const response = await instance.get("/api/v1/websites");
            setWebsites(response.data.websites);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshWebsites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    return { websites, loading, refreshWebsites };
}
