import React from 'react';
import { cn } from '@/lib/utils';

const HeartbeatPage = () => {
    return (
        <div className={cn('mx-auto flex flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 md:flex-row dark:border-neutral-700 bg-gray-100 dark:bg-gray-900 w-full', 'h-screen')}>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Heartbeat Configuration</h1>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Service URL</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="https://example.com" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Heartbeat Frequency</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option>1 day</option>
                        <option>12 hours</option>
                        <option>6 hours</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Grace Period</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option>5 minutes</option>
                        <option>10 minutes</option>
                        <option>15 minutes</option>
                    </select>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">On-call Escalation</h2>
                    <div className="mt-2">
                        <label className="block text-sm font-medium">Notification Methods</label>
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Email
                            <input type="checkbox" className="mr-2" /> SMS
                            <input type="checkbox" className="mr-2" /> Push Notification
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeartbeatPage;