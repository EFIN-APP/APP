"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Search, Home, Flame, Map, Plus, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Video {
  id: number
  user: string
  title: string
  description: string
  src: string
}

interface FintokProps {
  videos: Video[]
}

export default function Fintok({ videos }: FintokProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    user: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentVideo = videos[currentVideoIndex]

  useEffect(() => {
    // Auto-play the first video when component mounts
    const firstVideo = videoRefs.current[0]
    if (firstVideo && currentVideoIndex === 0) {
      const playPromise = firstVideo.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log("[v0] First video autoplay failed, user interaction required")
          setIsPlaying(false)
        })
      }
    }
  }, []) // Empty dependency array to run only on mount

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex && isPlaying) {
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              console.log(`[v0] Video ${index} autoplay failed`)
              setIsPlaying(false)
            })
          }
        } else {
          video.pause()
        }
      }
    })
  }, [currentVideoIndex, isPlaying])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      if (isScrolling) return

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollTop = container.scrollTop
        const videoHeight = container.clientHeight
        const newIndex = Math.round(scrollTop / videoHeight)

        if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
          setCurrentVideoIndex(newIndex)
          setIsPlaying(true)
        }
      }, 100)
    }

    container.addEventListener("scroll", handleScroll)
    return () => {
      container.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [currentVideoIndex, videos.length])

  const togglePlayPause = () => {
    const currentVideoRef = videoRefs.current[currentVideoIndex]
    if (currentVideoRef) {
      if (isPlaying) {
        currentVideoRef.pause()
        setIsPlaying(false)
      } else {
        currentVideoRef.play().catch(() => {})
        setIsPlaying(true)
      }
    }
  }

  const handleVideoError = (index: number) => {
    console.log(`Video ${index} failed to load`)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile && uploadData.title && uploadData.user) {
      console.log("[v0] Uploading video:", {
        file: selectedFile,
        ...uploadData,
      })

      setUploadData({ title: "", description: "", user: "" })
      setSelectedFile(null)
      setShowUploadModal(false)

      alert("¡Video subido exitosamente! (Demo)")
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-white font-bold text-xl">Fintok</div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Search className="h-6 w-6" />
        </Button>
      </div>

      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="relative w-full h-screen snap-start flex-shrink-0">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => handleVideoError(index)}
              onLoadedData={() => console.log(`[v0] Video ${index} loaded successfully`)}
            />

            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 flex items-center justify-center"
              style={{
                display: videoRefs.current[index]?.error ? "flex" : "none",
              }}
            >
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">📊</div>
                <div className="text-xl font-bold mb-2">{video.title}</div>
                <div className="text-sm opacity-80">{video.user}</div>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex-1 flex items-center justify-center">
                {index === currentVideoIndex && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayPause}
                    className="w-16 h-16 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </Button>
                )}
              </div>

              <div className="text-white space-y-2">
                <div className="text-sm font-medium opacity-80">{video.user}</div>
                <div className="text-lg font-bold text-balance">{video.title}</div>
                <div className="text-sm opacity-90 text-pretty">{video.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-center space-x-8 py-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Flame className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Home className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200 transition-all"
            onClick={() => setShowUploadModal(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Map className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {showUploadModal && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Subir Video</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {selectedFile ? selectedFile.name : "Seleccionar Video"}
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium">Usuario</label>
                <Input
                  placeholder="@tuusuario"
                  value={uploadData.user}
                  onChange={(e) => setUploadData({ ...uploadData, user: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                  placeholder="Título del video"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  placeholder="Describe tu video..."
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleUpload}
                disabled={!selectedFile || !uploadData.title || !uploadData.user}
              >
                Subir Video
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
