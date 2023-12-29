import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <div className="h-full bg-slate-100 dark:bg-slate-800">
      <Navbar />
      <main className="bg-slate-100 pb-20 pt-40 dark:bg-slate-800 ">
        {children}
      </main>
      <Footer />
    </div>
  )
}
