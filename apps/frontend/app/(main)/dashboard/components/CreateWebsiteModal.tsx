"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const websiteSchema = z.object({
    url: z
        .string()
        .url({
            message: "Please enter a valid URL including http:// or https://",
        }),
    interval: z.number().min(10).max(1440),
});

/**
 * Displays a modal dialog for adding a new website with a URL and check interval.
 *
 * When submitted, calls {@link onClose} with the entered URL and interval. If canceled or closed, calls {@link onClose} with `null`.
 *
 * @param isOpen - Whether the modal is visible.
 * @param onClose - Callback invoked with the website URL and interval on submit, or `null` if canceled.
 *
 * @returns The modal dialog component, or `null` if not open.
 */
export function CreateWebsiteModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: (url: string | null, interval?: number) => void;
}) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue,
    } = useForm<z.infer<typeof websiteSchema>>({
        resolver: zodResolver(websiteSchema),
        mode: "onChange",
    });

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose(null)}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Globe className="mr-2 h-5 w-5" />
                        Add New Website
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(async (data) => {
                        setIsSubmitting(true);
                        try {
                            await onClose(data.url, data.interval);
                        } finally {
                            setIsSubmitting(false);
                        }
                    })}
                    className="space-y-6"
                >
                    <div>
                        <Label htmlFor="website-url">Website URL</Label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Globe className="text-muted-foreground h-4 w-4" />
                            </div>
                            <Input
                                id="website-url"
                                type="url"
                                className="pl-10"
                                placeholder="https://example.com"
                                {...register("url")}
                            />
                        </div>
                        {errors.url && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.url.message as string}
                            </p>
                        )}
                        <p className="text-muted-foreground mt-1 text-xs">
                            Enter the full URL including http:// or https://
                        </p>
                    </div>

                    <div>
                        <Label htmlFor="check-interval">
                            Check Interval (minutes)
                        </Label>
                        <div className="mt-3 space-y-2">
                            <Slider
                                defaultValue={[60]}
                                min={10}
                                max={1440}
                                step={10}
                                className="w-full"
                                onValueChange={(value) =>
                                    setValue("interval", value[0])
                                }
                            />
                            <div className="text-muted-foreground flex justify-between text-xs">
                                <span>10 min</span>
                                <span>1440 min (24h)</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
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
                            ) : (
                                "Add Website"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
