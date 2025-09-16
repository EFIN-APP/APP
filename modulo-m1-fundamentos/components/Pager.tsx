"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"

export interface PagerProps {
  children: React.ReactNode[]
  initialIndex?: number
  onIndexChange?: (index: number) => void
  heightPx?: number
  widthPx?: number
  enableArrows?: boolean
  showDots?: boolean
  analytics?: {
    onSwipe?: (from: number, to: number) => void
  }
}

export default function Pager({
  children,
  initialIndex = 0,
  onIndexChange,
  heightPx = 844,
  widthPx = 390,
  enableArrows = true,
  showDots = true,
  analytics,
}: PagerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalPages = children.length

  const goToIndex = useCallback(
    (newIndex: number, source: "swipe" | "arrow" | "dot" | "cta" = "swipe") => {
      if (newIndex < 0 || newIndex >= totalPages || newIndex === currentIndex) return

      const oldIndex = currentIndex
      setCurrentIndex(newIndex)
      setTranslateX(0)

      // Analytics tracking
      if (analytics?.onSwipe && source === "swipe") {
        analytics.onSwipe(oldIndex, newIndex)
      }

      // Custom analytics for other navigation methods
      if (source !== "swipe") {
        // This would be handled by parent component
        console.log(`[v0] Navigation: ${source} from ${oldIndex} to ${newIndex}`)
      }

      onIndexChange?.(newIndex)
    },
    [currentIndex, totalPages, analytics, onIndexChange],
  )

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setTranslateX(0)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return

      const currentX = e.touches[0].clientX
      const deltaX = currentX - startX
      setTranslateX(deltaX)
    },
    [isDragging, startX],
  )

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)

    // Swipe threshold: 60px
    const threshold = 60

    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        goToIndex(currentIndex - 1, "swipe")
      } else if (translateX < 0 && currentIndex < totalPages - 1) {
        // Swipe left - go to next
        goToIndex(currentIndex + 1, "swipe")
      }
    }

    setTranslateX(0)
  }, [isDragging, translateX, currentIndex, totalPages, goToIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        goToIndex(currentIndex - 1, "arrow")
      } else if (e.key === "ArrowRight" && currentIndex < totalPages - 1) {
        goToIndex(currentIndex + 1, "arrow")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, totalPages, goToIndex])

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault()
      }
    }

    document.addEventListener("touchmove", preventScroll, { passive: false })
    return () => document.removeEventListener("touchmove", preventScroll)
  }, [isDragging])

  const trackStyle = {
    transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
    transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }

  return (
    <div
      ref={containerRef}
      className="pager"
      style={{ height: `${heightPx}px`, maxWidth: `${widthPx}px`, margin: "0 auto" }}
      role="group"
      aria-label={`Página ${currentIndex + 1} de ${totalPages}`}
    >
      <div
        ref={trackRef}
        className="pager-track"
        style={trackStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children.map((child, index) => (
          <div key={index} className="pager-page">
            {child}
          </div>
        ))}
      </div>

      {enableArrows && (
        <>
          <button
            className="nav-arrow left"
            onClick={() => goToIndex(currentIndex - 1, "arrow")}
            disabled={currentIndex === 0}
            aria-label="Ir a la página anterior"
          >
            ←
          </button>
          <button
            className="nav-arrow right"
            onClick={() => goToIndex(currentIndex + 1, "arrow")}
            disabled={currentIndex === totalPages - 1}
            aria-label="Ir a la página siguiente"
          >
            →
          </button>
        </>
      )}

      {showDots && (
        <div className="dots">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToIndex(index, "dot")}
              aria-label={`Ir a la página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
