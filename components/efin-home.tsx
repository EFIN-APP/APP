"use client"

import { useReducer } from "react"
import { ContinueCourseCard } from "./continue-course-card"
import { FeedTabs, FeedTab } from "./feed-tabs"
import { EFINFeed } from "./efin-feed"
import { PostComposer } from "./post-composer"
import { CourseModuleEngine } from "./course-module-engine"
import { UserProfile } from "./user-profile"
import { Button } from "./ui/button"
import { FintokFeed } from "./fintok-feed"
import { Flame, Home as HomeIcon, Plus, User } from "lucide-react"

type HomeState = {
  showPostComposer: boolean
  showCourseModule: boolean
  showProfile: boolean
  showFintok: boolean
  activeTab: FeedTab
}

type HomeAction =
  | { type: "SHOW_POST_COMPOSER"; value: boolean }
  | { type: "SHOW_COURSE_MODULE"; value: boolean }
  | { type: "SHOW_PROFILE"; value: boolean }
  | { type: "SHOW_FINTOK"; value: boolean }
  | { type: "SET_ACTIVE_TAB"; value: FeedTab }

interface EFINHomeProps {
  userName?: string
  objectives?: string[]
  interests?: string[]
  onResetProfile?: () => void
}

function reducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case "SHOW_POST_COMPOSER":
      return { ...state, showPostComposer: action.value }
    case "SHOW_COURSE_MODULE":
      return { ...state, showCourseModule: action.value }
    case "SHOW_PROFILE":
      return { ...state, showProfile: action.value }
    case "SHOW_FINTOK":
      return { ...state, showFintok: action.value }
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.value }
    default:
      return state
  }
}

export function EFINHome({ userName, objectives, interests, onResetProfile }: EFINHomeProps) {
  const [state, dispatch] = useReducer(reducer, {
    showPostComposer: false,
    showCourseModule: false,
    showProfile: false,
    showFintok: false,
    activeTab: FeedTab.ForYou,
  })

  if (state.showFintok) {
    return (
      <FintokFeed
        interests={interests}
        onClose={() => dispatch({ type: "SHOW_FINTOK", value: false })}
      />
    )
  }

  if (state.showProfile) {
    return (
      <div>
        <div className="fixed top-4 left-4 z-10">
          <Button onClick={() => dispatch({ type: "SHOW_PROFILE", value: false })} variant="ghost" className="text-white hover:bg-white/10">
            ← Back to Home
          </Button>
        </div>
        <UserProfile
          name={userName}
          objectives={objectives}
          interests={interests}
          onResetProfile={onResetProfile}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-efin-light-gray">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-efin-light-gray pb-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <ContinueCourseCard
              userName={userName}
              onStartCourse={() => dispatch({ type: "SHOW_COURSE_MODULE", value: true })}
            />
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
        <EFINFeed activeTab={state.activeTab} interests={interests} />
      </div>

      <div className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-efin-navy shadow-lg backdrop-blur">
        <Button
          onClick={() => {
            dispatch({ type: "SHOW_FINTOK", value: false })
          }}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-efin-navy hover:bg-efin-navy/10"
          aria-label="Inicio"
        >
          <HomeIcon className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => dispatch({ type: "SHOW_FINTOK", value: true })}
          size="icon"
          className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-md hover:from-orange-500 hover:to-pink-500"
          aria-label="Abrir Fintok"
        >
          <Flame className="h-5 w-5" />
        </Button>
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
