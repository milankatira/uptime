"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

/**
 * Renders a progress bar with a fixed height, blue color, no spinner, and shallow routing enabled.
 *
 * Intended for use as a global loading indicator in client-side React applications.
 */
export function ProgressBarWrapper() {
    return (
        <ProgressBar
            height="4px"
            color="#3b82f6"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
}
