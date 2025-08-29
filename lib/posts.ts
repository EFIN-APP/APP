export interface FeedPost {
  id: string
  username: string
  avatar: string
  timestamp: string
  content: string
  likes: number
  comments: number
  reposts: number
  isLiked: boolean
  isSaved: boolean
  isReposted: boolean
  tags?: string[]
  lessonReference?: {
    title: string
    progress: number
  }
}

export const mockPosts: FeedPost[] = [
  {
    id: "1",
    username: "FinanceGuru",
    avatar: "/finance-expert.png",
    timestamp: "2h",
    content:
      "Just completed the Time Value of Money module! The compound interest calculator really helped me understand how my investments will grow over time.",
    likes: 24,
    comments: 8,
    reposts: 3,
    isLiked: false,
    isSaved: true,
    isReposted: false,
    tags: ["TimeValue", "CompoundInterest"],
    lessonReference: {
      title: "Time Value of Money",
      progress: 100,
    },
  },
  {
    id: "2",
    username: "InvestmentNewbie",
    avatar: "/student-learning.png",
    timestamp: "4h",
    content:
      "Can someone explain why money today is worth more than money tomorrow? Still wrapping my head around this concept.",
    likes: 12,
    comments: 15,
    reposts: 1,
    isLiked: true,
    isSaved: false,
    isReposted: false,
    tags: ["Question", "TimeValue"],
  },
  {
    id: "3",
    username: "EFINTeacher",
    avatar: "/teacher-professional.png",
    timestamp: "6h",
    content:
      "Pro tip: Use the TVM simulator with different scenarios. Try calculating what happens if you save $100/month vs $200/month over 10 years. The difference will surprise you!",
    likes: 45,
    comments: 12,
    reposts: 8,
    isLiked: false,
    isSaved: false,
    isReposted: false,
    tags: ["ProTip", "Savings", "TVM"],
  },
  {
    id: "4",
    username: "BudgetMaster",
    avatar: "/budget-expert.png",
    timestamp: "8h",
    content:
      "Started the budgeting fundamentals course today. The 50/30/20 rule is a game changer for managing expenses!",
    likes: 18,
    comments: 6,
    reposts: 4,
    isLiked: false,
    isSaved: true,
    isReposted: false,
    tags: ["Budgeting", "PersonalFinance"],
    lessonReference: {
      title: "Budgeting Fundamentals",
      progress: 25,
    },
  },
]
