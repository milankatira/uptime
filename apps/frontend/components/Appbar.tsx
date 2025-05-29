"use client";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

/**
 * Renders the application’s top navigation bar with authentication controls.
 *
 * Displays the app title on the left and, on the right, shows sign-in and sign-up buttons when the user is signed out, or a user menu when signed in.
 */
export function Appbar() {
    return (
        <div className="flex items-center justify-between p-4">
            <div>Uptime</div>
            <div>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
}
