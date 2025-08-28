import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Bookmark, Share } from "lucide-react"

interface PostsFeedProps {
  showSocial?: boolean
}

export function PostsFeed({ showSocial = false }: PostsFeedProps) {
  const posts = [
    {
      id: 1,
      user: "Santiago Carrasco",
      username: "@santicarrasco",
      time: "2h",
      content: "Acabo de completar mi primera lección sobre presupuestos. ¡Me siento más confiado con mis finanzas!",
      tags: ["#presupuesto", "#finanzas"],
      likes: 12,
      comments: 3,
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: 2,
      user: "Delfina Palmero",
      username: "@delfinapalmero",
      time: "4h",
      content: "Compartiendo mi progreso del curso de inversiones. Ya voy por el 60% completado.",
      tags: ["#inversiones", "#progreso"],
      likes: 8,
      comments: 1,
      avatar: "/female-user-avatar.png",
    },
    {
      id: 3,
      user: "Juana Mora",
      username: "@juanamora",
      time: "6h",
      content: "¿Alguien más está tomando el curso de criptomonedas? Me gustaría formar un grupo de estudio.",
      tags: ["#crypto", "#estudio"],
      likes: 15,
      comments: 7,
      avatar: "/professional-woman-avatar.png",
    },
  ]

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
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent p-1">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent p-1">
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
