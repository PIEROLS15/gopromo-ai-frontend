import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AppProviders from "@/components/app-providers"
import Toaster from "@/components/ui/toaster"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "GoPromo AI - Viajes Estudiantiles en Cañete",
  description: "Plataforma inteligente de recomendación y reserva de viajes turísticos estudiantiles",
  generator: "v0.app",
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="es">
      <body className={`font-sans ${nunito.variable} ${GeistMono.variable}`}>
        <AppProviders>
          {children}
          {/* <Analytics /> */}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  )
}

export default RootLayout
