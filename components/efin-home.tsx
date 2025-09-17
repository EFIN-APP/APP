"use client"

import Link from "next/link"
import { useReducer } from "react"
import { ContinueCourseCard } from "./continue-course-card"
import { FeedTabs, FeedTab } from "./feed-tabs"
import { EFINFeed } from "./efin-feed"
import { PostComposer } from "./post-composer"
import { CourseModuleEngine } from "./course-module-engine"
import { Button } from "./ui/button"
import { Plus, User } from "lucide-react"

type HomeState = {
  showPostComposer: boolean
  showCourseModule: boolean
  activeTab: FeedTab
}

type HomeAction =
  | { type: "SHOW_POST_COMPOSER"; value: boolean }
  | { type: "SHOW_COURSE_MODULE"; value: boolean }
  | { type: "SET_ACTIVE_TAB"; value: FeedTab }

function reducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case "SHOW_POST_COMPOSER":
      return { ...state, showPostComposer: action.value }
    case "SHOW_COURSE_MODULE":
      return { ...state, showCourseModule: action.value }
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
    activeTab: FeedTab.ForYou,
  })

  return (
    <main className="min-h-screen bg-efin-light-gray">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-efin-light-gray pb-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <ContinueCourseCard onStartCourse={() => dispatch({ type: "SHOW_COURSE_MODULE", value: true })} />
          </div>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="ml-4 text-efin-navy hover:bg-efin-navy/10"
          >
            <Link href="/profile" aria-label="Go to my profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <FeedTabs
        activeTab={state.activeTab}
        onTabChange={(tab) => dispatch({ type: "SET_ACTIVE_TAB", value: tab })}
      />

      {/* Feed Content */}
      <section className="px-4 pb-20" aria-label={`${state.activeTab} feed`}>
        <EFINFeed activeTab={state.activeTab} />
      </section>

      {/* Floating Action Button */}
      <Button
        onClick={() => dispatch({ type: "SHOW_POST_COMPOSER", value: true })}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-efin-blue hover:bg-efin-blue/90 shadow-lg"
        size="icon"
        aria-label="Create a new post"
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
    </main>
  )
}
