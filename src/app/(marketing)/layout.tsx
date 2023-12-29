type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <div className="h-full bg-slate-100">
      <main>{children}</main>
    </div>
  )
}
