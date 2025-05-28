"use client";
import { OrganizationProfile, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function OrganizationProfilePage() {
  const { theme } = useTheme();
  const { orgId } = useAuth();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4 md:p-8 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        {orgId ? (
          <OrganizationProfile
            routing="hash"
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
            }}
          />
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <h2 className="text-xl font-semibold mb-4">
              No Organization Found
            </h2>
            <p className="mb-4">
              To manage team members, you need to be part of an organization.
            </p>
            <p>Please create or join an organization</p>
          </div>
        )}
      </div>
    </div>
  );
}
