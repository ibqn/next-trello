import { Footer, Navbar } from "@/components/marketing"

type Props = {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: Props) {
  return (
    <div className="h-full bg-slate-100 dark:bg-slate-800">
      <Navbar />
      <main className="bg-slate-100 pb-20 pt-40 dark:bg-slate-800">{children}</main>
      <Footer />
    </div>
  )
}
