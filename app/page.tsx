import Fintok from "@/components/fintok"

const videos = [
  {
    id: 1,
    user: "@financeexpert",
    title: "Time Value of Money",
    description: "Understanding the time value of money is essential for making smart financial decisions",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    user: "@stockmarket_guru",
    title: "Bull vs Bear Markets",
    description: "Learn the difference between bull and bear markets and how to navigate them",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    user: "@investmentpro",
    title: "Compound Interest Magic",
    description: "How compound interest can make you wealthy over time - Einstein's 8th wonder",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 4,
    user: "@cryptofinance",
    title: "DeFi Revolution",
    description: "Decentralized Finance is changing how we think about money and banking",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 5,
    user: "@personalfinance",
    title: "Emergency Fund Strategy",
    description: "Why you need 6 months of expenses saved and how to build it fast",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: 6,
    user: "@realestate_tips",
    title: "Real Estate vs Stocks",
    description: "Which investment vehicle is better for building long-term wealth?",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
]

export default function Home() {
  return <Fintok videos={videos} />
}
