import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function UserInfoCard() {
  return (
    <Card className="mx-4 my-4 border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">SC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">Santiago Carrasco</h2>
            <p className="text-muted-foreground">@santicarrasco</p>
            <Badge variant="secondary" className="mt-1">
              Principiante
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">2,300</p>
            <p className="text-sm text-muted-foreground">puntos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">seguidores</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-sm text-muted-foreground">siguiendo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
