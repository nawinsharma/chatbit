"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Play,
  ArrowRight,
  MessageCircle,
  Users,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function DemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120,119,198,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(120,119,198,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 50%, rgba(120,119,198,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm px-6 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
            Experience the Future of Messaging
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Ready to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Transform
            </span>{" "}
            Your Communication?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed"
          >
            Join thousands of developers who are already building the next generation 
            of real-time applications. Experience lightning-fast messaging, seamless scaling, 
            and enterprise-grade security in action.
          </motion.p>

          {/* Demo Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-8 text-xl font-semibold shadow-2xl overflow-hidden"
                asChild
              >
                <Link href="/chat" className="flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="h-6 w-6" />
                  </motion.div>
                  Launch Live Demo
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                  
                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    initial={{ scale: 0, opacity: 1 }}
                    whileHover={{
                      scale: 1,
                      opacity: 0,
                      transition: { duration: 0.6 },
                    }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-300 dark:border-blue-700 px-12 py-8 text-xl font-semibold backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-950/50"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-4">
                  <Users className="h-6 w-6" />
                  Get Started Free
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: MessageCircle, text: "Instant Setup", desc: "Deploy in minutes" },
              { icon: Users, text: "No Credit Card", desc: "Free to start" },
              { icon: Sparkles, text: "Full Source Code", desc: "Complete access" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
              >
                <feature.icon className="h-8 w-8 mb-3 text-blue-600" />
                <h3 className="font-semibold text-foreground mb-1">{feature.text}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 