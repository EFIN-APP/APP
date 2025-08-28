import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Bookmark, Share } from "lucide-react"
import { Post, posts as defaultPosts } from "@/lib/data"

interface PostsFeedProps {
  showSocial?: boolean
  posts?: Post[]
}

export function PostsFeed({ showSocial = false, posts = defaultPosts }: PostsFeedProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.user} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {post.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-sm">{post.user}</h4>
                  <span className="text-muted-foreground text-sm">{post.username}</span>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-muted-foreground text-sm">{post.time}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm mb-3 text-balance">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500 p-1">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent p-1">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{post.comments}</span>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-accent p-1"
                  aria-label="Guardar"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-accent p-1"
                  aria-label="Compartir"
                >
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
