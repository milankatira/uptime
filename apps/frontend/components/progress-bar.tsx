"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

/**
 * Displays a global progress bar with a fixed height and blue color, without a spinner, and with shallow routing enabled.
 *
 * Use this component as a loading indicator for client-side navigation in React applications.
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
