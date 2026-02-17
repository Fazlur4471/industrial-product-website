import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { motion } from 'framer-motion'

export const metadata = {
  title: 'Product Enquiry - Fast-Map',
  description: 'Submit your product enquiry and our team will contact you with detailed information.',
}

export default function EnquiryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Send Us an Enquiry
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Tell us about your requirements and we'll get back to you with a personalized solution.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <EnquiryForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
