"use client"

import { useEffect, useState } from "react"

import { EFINHome } from "@/components/efin-home"
import { EFINOnboarding, OnboardingData } from "@/components/efin-onboarding"

export default function Page() {
  const [profile, setProfile] = useState<OnboardingData | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem("efin-profile")
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as OnboardingData
        setProfile(parsed)
      } catch (error) {
        console.error("Failed to parse saved profile", error)
      }
    }
    setIsHydrated(true)
  }, [])

  const handleOnboardingComplete = (data: OnboardingData) => {
    localStorage.setItem("efin-profile", JSON.stringify(data))
    setProfile(data)
  }

  const handleResetProfile = () => {
    localStorage.removeItem("efin-profile")
    setProfile(null)
  }

  if (!isHydrated) {
    return null
  }

  if (!profile) {
    return <EFINOnboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <EFINHome
      userName={profile.name}
      objectives={profile.objectives}
      interests={profile.interests}
      onResetProfile={handleResetProfile}
    />
  )
}
