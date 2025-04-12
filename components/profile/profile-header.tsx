import { ProfileFormData } from "@/types/profile"

interface ProfileHeaderProps {
  userData: ProfileFormData
}

export function ProfileHeader({ userData }: ProfileHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
      <p className="text-muted-foreground">
        Manage your account settings and preferences
      </p>
    </div>
  )
}
