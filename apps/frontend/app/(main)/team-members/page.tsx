import { OrganizationProfile } from '@clerk/nextjs'
import { dark,  } from '@clerk/themes'
export default function OrganizationProfilePage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <OrganizationProfile
          routing="hash"
          appearance={{
            baseTheme: dark
          }}
        />
      </div>
    </div>
  )
}