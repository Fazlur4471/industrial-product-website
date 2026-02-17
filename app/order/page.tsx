import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { OrderForm } from '@/components/forms/OrderForm'

export const metadata = {
  title: 'Place an Order - Fast-Map',
  description: 'Place your order directly with Fast-Map for fast and reliable delivery.',
}

export default function OrderPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Place Your Order
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Fill out the form below to place your order. We'll process it promptly and keep you updated.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <OrderForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
