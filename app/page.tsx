'use client'

import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { ProductShowcase } from '@/components/home/ProductShowcase'

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <ProductShowcase />
      </main>
      <Footer />
    </>
  )
}
