"use client";
import React, { useState } from 'react';
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

export function CreateWebsiteModal({ isOpen, onClose }: { isOpen: boolean; onClose: (url: string | null) => void }) {
    const [url, setUrl] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);

    React.useEffect(() => {
        const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

        if (websiteRegex.test(url)) {
            try {
                setIsValidUrl(true);
            } catch {
                setIsValidUrl(false);
            }
        } else {
            setIsValidUrl(false);
        }
    }, [url]);

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
                <div className="space-y-4">
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
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Enter the full URL including http:// or https://
                        </p>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => onClose(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={!isValidUrl && url !== ''}
                        onClick={() => onClose(url)}
                    >
                        Add Website
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}