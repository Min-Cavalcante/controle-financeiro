import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Controle Financeiro',
  description: 'Sistema completo de controle de gastos e ganhos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
