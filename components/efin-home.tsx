"use client"

import { useReducer } from "react"
import { ContinueCourseCard } from "./continue-course-card"
import { FeedTabs, FeedTab } from "./feed-tabs"
import { EFINFeed } from "./efin-feed"
import { PostComposer } from "./post-composer"
import { CourseModuleEngine } from "./course-module-engine"
import { UserProfile } from "./user-profile"
import { Button } from "./ui/button"
import { Plus, User } from "lucide-react"

type HomeState = {
  showPostComposer: boolean
  showCourseModule: boolean
  showProfile: boolean
  activeTab: FeedTab
}

type HomeAction =
  | { type: "SHOW_POST_COMPOSER"; value: boolean }
  | { type: "SHOW_COURSE_MODULE"; value: boolean }
  | { type: "SHOW_PROFILE"; value: boolean }
  | { type: "SET_ACTIVE_TAB"; value: FeedTab }

function reducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case "SHOW_POST_COMPOSER":
      return { ...state, showPostComposer: action.value }
    case "SHOW_COURSE_MODULE":
      return { ...state, showCourseModule: action.value }
    case "SHOW_PROFILE":
      return { ...state, showProfile: action.value }
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.value }
    default:
      return state
  }
}

export function EFINHome() {
  const [state, dispatch] = useReducer(reducer, {
    showPostComposer: false,
    showCourseModule: false,
    showProfile: false,
    activeTab: FeedTab.ForYou,
  })

  if (state.showProfile) {
    return (
      <div>
        <div className="fixed top-4 left-4 z-10">
          <Button onClick={() => dispatch({ type: "SHOW_PROFILE", value: false })} variant="ghost" className="text-white hover:bg-white/10">
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
            <ContinueCourseCard onStartCourse={() => dispatch({ type: "SHOW_COURSE_MODULE", value: true })} />
          </div>
          <Button
            onClick={() => dispatch({ type: "SHOW_PROFILE", value: true })}
            variant="ghost"
            size="icon"
            className="ml-4 text-efin-navy hover:bg-efin-navy/10"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <FeedTabs
        activeTab={state.activeTab}
        onTabChange={(tab) => dispatch({ type: "SET_ACTIVE_TAB", value: tab })}
      />

      {/* Feed Content */}
      <div className="px-4 pb-20">
        <EFINFeed activeTab={state.activeTab} />
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => dispatch({ type: "SHOW_POST_COMPOSER", value: true })}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-efin-blue hover:bg-efin-blue/90 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>

      {/* Post Composer Modal */}
      {state.showPostComposer && (
        <PostComposer onClose={() => dispatch({ type: "SHOW_POST_COMPOSER", value: false })} />
      )}

      {/* Course Module Engine */}
      {state.showCourseModule && (
        <CourseModuleEngine onClose={() => dispatch({ type: "SHOW_COURSE_MODULE", value: false })} />
      )}
    </div>
  )
}
