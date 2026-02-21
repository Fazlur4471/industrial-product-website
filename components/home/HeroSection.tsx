'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-accent/20 border border-accent rounded-full text-accent text-sm font-semibold">
                Premium Industrial Solutions
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight"
            >
              Industrial Excellence
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 text-balance leading-relaxed"
            >
              Discover premium industrial products for trading and manufacturing. Maharaja Electronics
              delivers quality solutions backed by decades of industry expertise.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/trading"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Explore Trading
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/manufacturing"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors border border-border"
              >
                Manufacturing Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
            <div className="absolute inset-0 border border-border rounded-2xl" />
            <div className="absolute top-8 left-8 w-32 h-32 bg-accent rounded-lg opacity-20 blur-2xl animate-pulse" />
            <div className="absolute bottom-8 right-8 w-40 h-40 bg-primary rounded-lg opacity-20 blur-2xl animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
