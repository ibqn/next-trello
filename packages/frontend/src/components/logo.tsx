import Image from "next/image"
import Link from "next/link"

type Props = {}

export const Logo = (props: Props) => {
  return (
    <Link href="/">
      <div className="hidden cursor-pointer items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />

        <p className="text-lg font-semibold text-neutral-700">Taskify</p>
      </div>
    </Link>
  )
}
