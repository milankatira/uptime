'use client';
import React from 'react';
import { useState } from 'react';
import { ArrowLeft, Heart, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Link from 'next/link';

const IncidentDetailPage = () => {
    const [comment, setComment] = useState('');

    // Mock incident data
    const incident = {
        id: 'dskndnjrd',
        status: 'Ongoing',
        date: 'May 14, 2025 at 7:57pm IST',
        acknowledged: false,
        cause: 'Missed heartbeat',
        started: '1 day ago',
        length: 'Ongoing',
        escalation: 'Entire team',
        timeline: [
            {
                id: 1,
                type: 'email',
                message: 'Sent an email to',
                recipient: 'milankatira Katira at milankatira26@gmail.com',
                time: 'May 14 at 7:57pm IST'
            },
            {
                id: 2,
                type: 'start',
                message: 'Incident started.',
                time: 'May 14 at 7:57pm IST'
            }
        ]
    };

    const handleAcknowledge = () => {
        toast.success('Incident acknowledged', {
            description: 'You have acknowledged this incident'
        });
    };

    const handleEscalate = () => {
        toast.info('Incident escalated', {
            description: 'This incident has been escalated to the team'
        });
    };

    const handlePostComment = () => {
        if (comment.trim()) {
            toast.success('Comment posted', {
                description: 'Your comment has been added to the timeline'
            });
            setComment('');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 w-full">
            <div className="max-w-6xl mx-auto py-6 px-4 md:px-6 bg-white dark:bg-gray-900">
                {/* Breadcrumb navigation */}
                <div className="flex items-center mb-8 text-sm">
                    <Link href="/heartbeats" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Incidents
                    </Link>
                    <span className="text-gray-400 dark:text-gray-600 mx-2">/</span>
                    <span className="text-gray-900 dark:text-gray-200">{incident.id}</span>
                </div>

                {/* Header section with status and actions */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mr-4">
                                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{incident.id}</h1>
                                <div className="flex items-center text-sm">
                                    <span className="text-red-500 dark:text-red-400 mr-2">{incident.status}</span>
                                    <span className="text-gray-500 dark:text-gray-400">• {incident.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                variant="outline"
                                className="bg-dark-lighter border-dark-border  hover:bg-dark-border"
                            >
                                <Heart className="h-4 w-4 mr-2" />
                                Heartbeat
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-dark-lighter border-dark-border  hover:bg-dark-border"
                            >
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6l3 1m0 0l-3 9a5 5 0 0 0 7.5 3h6A2 2 0 0 0 21 16v-5a2 2 0 0 0-2-2h-.5"></path>
                                    <path d="M8.5 12H12a2 2 0 0 0 2-2V8"></path>
                                </svg>
                                Remove
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm text-right">
                        {!incident.acknowledged && <span className="text-gray-400">Not acknowledged yet</span>}
                    </div>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-dark-lighter border-dark-border">
                        <CardContent className="p-5">
                            <p className="text-gray-400 text-sm mb-1">Cause</p>
                            <h3 className=" font-semibold">{incident.cause}</h3>
                        </CardContent>
                    </Card>

                    <Card className="bg-dark-lighter border-dark-border">
                        <CardContent className="p-5">
                            <p className="text-gray-400 text-sm mb-1">Started at</p>
                            <h3 className=" font-semibold">{incident.started}</h3>
                        </CardContent>
                    </Card>

                    <Card className="bg-dark-lighter border-dark-border">
                        <CardContent className="p-5">
                            <p className="text-gray-400 text-sm mb-1">Length</p>
                            <h3 className=" font-semibold">{incident.length}</h3>
                        </CardContent>
                    </Card>
                </div>

                {/* Escalation section */}
                <Card className="bg-dark-lighter border-dark-border mb-8">
                    <CardContent className="p-5">
                        <p className="text-gray-400 text-sm mb-1">Escalation</p>
                        <h3 className=" font-semibold">{incident.escalation}</h3>
                    </CardContent>
                </Card>

                {/* Metadata section */}
                <Card className="bg-dark-lighter border-dark-border mb-8">
                    <CardContent className="p-5">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 text-sm">Metadata</p>
                            <Button variant="ghost" size="sm" className="text-gray-400 text-xs">
                                <span className="mr-1">+</span> Add
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold  mb-6">Timeline</h2>

                    <div className="mb-6">
                        <div className="relative flex">
                            <div className="w-10 flex flex-col items-center mr-4">
                                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-dark-lighter text-blue-500 z-10">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div className="w-px bg-gray-700 h-full"></div>
                            </div>
                            <div className="flex flex-col flex-grow pb-8">
                                <div className="flex items-center">
                                    <p className=" text-sm">
                                        {incident.timeline[0].message} <span className="font-medium">{incident.timeline[0].recipient}</span>
                                    </p>
                                </div>
                                <span className="text-gray-500 text-xs mt-1">{incident.timeline[0].time}</span>
                            </div>
                            <div className="text-gray-500 text-xs mt-2 flex justify-end">
                                {incident.timeline[0].time}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="relative flex">
                            <div className="w-10 flex flex-col items-center mr-4">
                                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-dark-lighter text-blue-400 z-10">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <div className="w-px bg-gray-700 h-full"></div>
                            </div>
                            <div className="flex flex-col flex-grow pb-8">
                                <div className="flex items-center">
                                    <p className=" text-sm">{incident.timeline[1].message}</p>
                                </div>
                                <span className="text-gray-500 text-xs mt-1">{incident.timeline[1].time}</span>
                            </div>
                            <div className="text-gray-500 text-xs mt-2 flex justify-end">
                                {incident.timeline[1].time}
                            </div>
                        </div>
                    </div>

                    {/* Comment input */}
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 mr-4"></div>
                        <div className="flex-grow relative">
                            <Input
                                className="w-full py-3 px-4 bg-dark-lighter border-dark-border  rounded-md pr-12"
                                placeholder="Leave a comment or post-mortem. You can use markdown here or @mention a colleague."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <Button
                            className="ml-3 bg-gray-700 hover:bg-gray-600"
                            onClick={handlePostComment}
                        >
                            Post
                        </Button>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        className="bg-dark-lighter border-dark-border  hover:bg-dark-border"
                        onClick={handleEscalate}
                    >
                        Escalate
                    </Button>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-700 "
                        onClick={handleAcknowledge}
                    >
                        Acknowledge
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default IncidentDetailPage;
