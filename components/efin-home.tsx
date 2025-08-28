"use client"

import { useState } from "react"
import { ContinueCourseCard } from "./continue-course-card"
import { FeedTabs } from "./feed-tabs"
import { EFINFeed } from "./efin-feed"
import { PostComposer } from "./post-composer"
import { CourseModuleEngine } from "./course-module-engine"
import { UserProfile } from "./user-profile"
import { Button } from "./ui/button"
import { Plus, User } from "lucide-react"

export function EFINHome() {
  const [showPostComposer, setShowPostComposer] = useState(false)
  const [showCourseModule, setShowCourseModule] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [activeTab, setActiveTab] = useState("For You")

  if (showProfile) {
    return (
      <div>
        <div className="fixed top-4 left-4 z-10">
          <Button onClick={() => setShowProfile(false)} variant="ghost" className="text-white hover:bg-white/10">
            ← Back to Home
          </Button>
        </div>
        <UserProfile />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-efin-light-gray">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-efin-light-gray pb-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <ContinueCourseCard onStartCourse={() => setShowCourseModule(true)} />
          </div>
          <Button
            onClick={() => setShowProfile(true)}
            variant="ghost"
            size="icon"
            className="ml-4 text-efin-navy hover:bg-efin-navy/10"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Feed Content */}
      <div className="px-4 pb-20">
        <EFINFeed activeTab={activeTab} />
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setShowPostComposer(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-efin-blue hover:bg-efin-blue/90 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>

      {/* Post Composer Modal */}
      {showPostComposer && <PostComposer onClose={() => setShowPostComposer(false)} />}

      {/* Course Module Engine */}
      {showCourseModule && <CourseModuleEngine onClose={() => setShowCourseModule(false)} />}
    </div>
  )
}
