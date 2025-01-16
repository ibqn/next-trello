import { Navbar } from "@/components/platform/navbar"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-full grow flex-col">
      <Navbar />
      {children}
    </div>
  )
}
