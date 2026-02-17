import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
