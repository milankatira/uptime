"use client";
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const websiteSchema = z.object({
    url: z.string().url({ message: 'Please enter a valid URL including http:// or https://' }),
    interval: z.number().min(10).max(1440)
});

export function CreateWebsiteModal({ isOpen, onClose }: { isOpen: boolean; onClose: (url: string | null, interval?: number) => void }) {

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({
        resolver: zodResolver(websiteSchema),
        mode: 'onChange'
    });

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose(null)}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Add New Website
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(async (data) => {
                    setIsSubmitting(true);
                    try {
                        await onClose(data.url, data.interval);
                    } finally {
                        setIsSubmitting(false);
                    }
                })} className="space-y-6">
                    <div>
                        <Label htmlFor="website-url">Website URL</Label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <Input
                                id="website-url"
                                type="url"
                                className="pl-10"
                                placeholder="https://example.com"
                                {...register('url')}
                            />
                        </div>
                        {errors.url && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.url.message as string}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">
                            Enter the full URL including http:// or https://
                        </p>
                    </div>

                    <div>
                        <Label htmlFor="check-interval">Check Interval (minutes)</Label>
                        <div className="mt-3 space-y-2">
                            <Slider
                                defaultValue={[60]}
                                min={10}
                                max={1440}
                                step={10}
                                className="w-full"
                                {...register('interval')}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>10 min</span>
                                <span>1440 min (24h)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                reset();
                                onClose(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : 'Add Website'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}