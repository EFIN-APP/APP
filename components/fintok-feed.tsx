"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { Flame, Heart, MessageCircle, Share2, Volume2, VolumeX, X } from "lucide-react"

import { fintokClips } from "@/lib/fintok"
import { Button } from "./ui/button"

interface FintokFeedProps {
  onClose: () => void
  interests?: string[]
}

export function FintokFeed({ onClose, interests }: FintokFeedProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => null)
            }
          } else {
            video.pause()
            video.currentTime = 0
          }
        })
      },
      { threshold: 0.75 },
    )

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted
      }
    })
  }, [isMuted])

  const interestHint = useMemo(() => {
    if (!interests?.length) {
      return null
    }

    const topSelections = interests.slice(0, 2).join(", ")
    return `Curado para tus intereses: ${topSelections}`
  }, [interests])

  return (
    <div className="fixed inset-0 z-40 bg-black text-white">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/70">
          <Flame className="h-5 w-5 text-orange-500" />
          <span>Fintok</span>
        </div>
        <div className="flex items-center gap-3">
          {interestHint && (
            <span className="hidden rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 sm:block">
              {interestHint}
            </span>
          )}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/10"
            aria-label="Volver al inicio"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 top-14 flex items-center justify-between px-4 text-xs text-white/60">
        <span>Deslizá hacia arriba para más videos</span>
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-medium hover:bg-white/20"
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          <span>{isMuted ? "Sonido off" : "Sonido on"}</span>
        </button>
      </div>

      <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
        {fintokClips.map((clip, index) => (
          <section key={clip.id} className="relative flex h-screen w-full snap-start items-end justify-between pb-20">
            <video
              ref={(element) => {
                videoRefs.current[index] = element
              }}
              src={clip.videoUrl}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              loop
              muted={isMuted}
              preload="metadata"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="relative z-10 w-full px-6 pb-6 pr-24">
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/40">
                  <Image src={clip.avatar} alt={clip.creator} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{clip.creator}</p>
                  <p className="text-xs text-white/70">{clip.role}</p>
                </div>
              </div>

              <h2 className="text-lg font-semibold leading-tight">{clip.title}</h2>
              <p className="mt-2 text-sm text-white/80">{clip.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {clip.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className="absolute bottom-28 right-4 z-10 flex flex-col items-center gap-6 text-sm font-medium">
              <button className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full bg-white/10 text-white hover:bg-white/20">
                <Heart className="h-5 w-5" />
                <span className="text-xs">{clip.likes.toLocaleString()}</span>
              </button>
              <button className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full bg-white/10 text-white hover:bg-white/20">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">{clip.comments.toLocaleString()}</span>
              </button>
              <button className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full bg-white/10 text-white hover:bg-white/20">
                <Share2 className="h-5 w-5" />
                <span className="text-xs">{clip.shares.toLocaleString()}</span>
              </button>
            </aside>
          </section>
        ))}
      </div>
    </div>
  )
}
