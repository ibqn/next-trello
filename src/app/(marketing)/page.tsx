import { Medal } from "lucide-react"

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-x-2">
          <Medal className="h-6 w-6" />
          <span>No 1 task management</span>
        </div>
      </div>
    </div>
  )
}
