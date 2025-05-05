import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const HeartbeatPage = () => {
    return (
        <div className={cn('mx-auto flex flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 md:flex-row dark:border-neutral-700 bg-gray-100 dark:bg-gray-900 w-full', 'h-screen')}>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Heartbeat Configuration</h1>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Service URL</label>
                    <Input type="text" placeholder="https://example.com" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Heartbeat Frequency</label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1day">1 day</SelectItem>
                            <SelectItem value="12hours">12 hours</SelectItem>
                            <SelectItem value="6hours">6 hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Grace Period</label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select grace period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5min">5 minutes</SelectItem>
                            <SelectItem value="10min">10 minutes</SelectItem>
                            <SelectItem value="15min">15 minutes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">On-call Escalation</h2>
                    <div className="mt-2">
                        <label className="block text-sm font-medium">Notification Methods</label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="email" />
                                <Label htmlFor="email">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="sms" />
                                <Label htmlFor="sms">SMS</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="push" />
                                <Label htmlFor="push">Push Notification</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeartbeatPage;