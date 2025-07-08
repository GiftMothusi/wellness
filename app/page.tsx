"use client"

import type React from "react"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Play, Check, Sparkles, Leaf, Heart } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

// Floating shapes component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-sage-200/30 to-sage-300/20 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-cream-200/40 to-sage-200/30 rounded-lg rotate-45 blur-sm"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          rotate: [45, 60, 45],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-br from-sage-300/25 to-cream-300/35 rounded-full blur-sm"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-8 h-24 bg-gradient-to-b from-sage-200/20 to-transparent rounded-full blur-sm"
        animate={{
          rotate: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

// Animated text component
const AnimatedText = ({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered text animation
const StaggeredText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ")

  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default function DigitalWellnessStudio() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const testimonials = [
    {
      name: "Thabo Mthembu",
      role: "Marketing Director",
      content: "This app transformed my daily routine. The guided meditations are perfect for my busy schedule.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Naledi Khumalo",
      role: "Software Engineer",
      content: "Finally, a wellness app that understands the modern lifestyle. Clean, intuitive, and effective.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Sipho van der Merwe",
      role: "Creative Designer",
      content: "The interface is beautiful and the content is genuinely helpful. It's become part of my daily ritual.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for beginners",
      features: ["5 guided meditations", "Basic sleep stories", "Progress tracking", "Community access"],
      popular: false,
    },
    {
      name: "Premium",
      price: "R149",
      period: "/month",
      description: "For dedicated practitioners",
      features: [
        "Unlimited meditations",
        "Premium sleep content",
        "Advanced analytics",
        "Offline downloads",
        "Expert sessions",
      ],
      popular: true,
    },
    {
      name: "Lifetime",
      price: "R2,999",
      description: "One-time investment",
      features: ["Everything in Premium", "Lifetime updates", "Exclusive content", "Priority support", "Beta features"],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100 relative overflow-hidden">
      <FloatingShapes />

      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-sage-300/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 p-6 flex justify-between items-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-sage-400 to-sage-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-sage-800">Serenity</span>
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {["Features", "Testimonials", "Pricing", "About"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              whileHover={{ y: -2 }}
              className="text-sage-700 hover:text-sage-900 transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-2 rounded-full">Get Started</Button>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <motion.div style={{ y, opacity }} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <Badge className="bg-sage-100 text-sage-800 px-4 py-2 rounded-full border-sage-200">
              <Sparkles className="w-4 h-4 mr-2" />
              New: AI-Powered Wellness Insights
            </Badge>
          </motion.div>

          <StaggeredText
            text="Find Your Inner Peace in the Digital Age"
            className="text-5xl md:text-7xl font-bold text-sage-900 mb-6 leading-tight"
          />

          <AnimatedText delay={0.8} className="text-xl text-sage-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your daily routine with personalized meditation, mindfulness exercises, and wellness tracking
            designed for modern life.
          </AnimatedText>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full text-lg">
                Start Your Journey
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-4 rounded-full text-lg bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
            className="relative max-w-sm mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-200/50 to-cream-200/50 rounded-[3rem] blur-2xl transform scale-110" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-gradient-to-br from-sage-50 to-cream-50 rounded-[2.5rem] p-8 h-[600px] flex flex-col">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-sage-400 to-sage-600 rounded-2xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-sage-900 mb-2">Good Morning</h3>
                    <p className="text-sage-600">Ready for today's mindfulness?</p>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="bg-white/80 rounded-3xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-sage-200 rounded-full" />
                        <div>
                          <p className="font-medium text-sage-900">Morning Meditation</p>
                          <p className="text-sm text-sage-600">10 min • Beginner</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-3xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-cream-200 rounded-full" />
                        <div>
                          <p className="font-medium text-sage-900">Breathing Exercise</p>
                          <p className="text-sm text-sage-600">5 min • Quick</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">Wellness Made Simple</h2>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Everything you need to build lasting wellness habits, backed by science and designed for real life.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Personalized Programs",
                description: "AI-powered recommendations based on your goals, schedule, and preferences.",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Mindful Moments",
                description:
                  "Quick exercises that fit seamlessly into your busy day, from 1-minute breathing to 30-minute sessions.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Progress Insights",
                description: "Beautiful analytics that show your wellness journey and celebrate your growth.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="p-8 h-full bg-white/80 backdrop-blur-sm border-sage-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                  <CardContent className="p-0">
                    <div className="text-sage-600 mb-4 group-hover:text-sage-700 transition-colors">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-sage-900 mb-3">{feature.title}</h3>
                    <p className="text-sage-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-6 py-20 bg-gradient-to-r from-sage-50/50 to-cream-50/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">Loved by Thousands</h2>
            <p className="text-xl text-sage-600">
              Join a community of people transforming their lives through mindful technology.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="p-6 h-full bg-white/90 backdrop-blur-sm border-sage-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sage-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-sage-900">{testimonial.name}</p>
                        <p className="text-sm text-sage-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">Choose Your Path</h2>
            <p className="text-xl text-sage-600">
              Start free, upgrade when you're ready. No commitments, just results.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
                className="group relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-sage-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <Card
                  className={`p-8 h-full transition-all duration-300 rounded-3xl ${
                    plan.popular
                      ? "bg-gradient-to-br from-sage-50 to-cream-50 border-sage-300 shadow-xl scale-105"
                      : "bg-white/80 backdrop-blur-sm border-sage-100 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-sage-900 mb-2">{plan.name}</h3>
                      <p className="text-sage-600 mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-sage-900">{plan.price}</span>
                        {plan.period && <span className="text-sage-600 ml-1">{plan.period}</span>}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + j * 0.05, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <Check className="w-5 h-5 text-sage-600 mr-3 flex-shrink-0" />
                          <span className="text-sage-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className={`w-full py-3 rounded-full transition-all duration-300 ${
                          plan.popular
                            ? "bg-sage-600 hover:bg-sage-700 text-white"
                            : "bg-sage-100 hover:bg-sage-200 text-sage-800"
                        }`}
                      >
                        {plan.name === "Starter" ? "Start Free" : "Get Started"}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-br from-sage-100 to-cream-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">Ready to Transform Your Wellness?</h2>
            <p className="text-xl text-sage-600 mb-8 max-w-2xl mx-auto">
              Join thousands who've already discovered the power of mindful technology. Start your journey today.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white px-12 py-4 rounded-full text-lg">
                Begin Your Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-sage-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-sage-400 to-sage-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Serenity</span>
            </div>
            <div className="flex space-x-6 text-sage-300">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="border-t border-sage-800 mt-8 pt-8 text-center text-sage-400">
            <p>&copy; 2024 Serenity Digital Wellness Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
