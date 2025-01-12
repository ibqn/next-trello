import { Navbar } from "@/components/platform/navbar"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-full">
      <Navbar />
      {children}
    </div>
  )
}
