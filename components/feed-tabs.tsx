"use client"

import { cn } from "@/lib/utils"

interface FeedTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  const tabs = ["For You", "Following", "Finance"]

  return (
    <div className="px-4 mb-4">
      <div className="flex bg-white rounded-xl p-1 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200",
              activeTab === tab ? "bg-efin-blue text-white shadow-sm" : "text-gray-600 hover:text-efin-blue",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
