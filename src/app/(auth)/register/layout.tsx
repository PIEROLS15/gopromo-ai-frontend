import { Suspense } from "react"
import Header from "@/components/home/layout/header"
import { Loader } from "@/components/loader"

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      {children}
    </Suspense>
  )
}
