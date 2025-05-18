"use client";
import { OrganizationProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function OrganizationProfilePage() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4 md:p-8 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <OrganizationProfile
          routing="hash"
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
      </div>
    </div>
  );
}
