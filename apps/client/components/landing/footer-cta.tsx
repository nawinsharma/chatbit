"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function FooterCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-t from-background to-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Experience real-time chat{" "}
            <span className="text-blue-600 dark:text-blue-400">
              redefined
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground mb-12 leading-relaxed"
          >
            Launch the demo now and see how our scalable chat infrastructure 
            can transform your applications communication capabilities.
          </motion.p>

          {/* Final CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-16 py-8 text-xl font-semibold shadow-2xl overflow-hidden"
                asChild
              >
                <Link href="/chat" className="flex items-center gap-4">
                  <motion.div
                    animate={{ 
                      y: [0, -4, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Rocket className="h-6 w-6" />
                  </motion.div>
                  Launch Demo Now
                  
                  {/* Animated ripple effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Click ripple */}
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
          </motion.div>

          {/* Scroll to top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors backdrop-blur-sm border border-border/50"
            >
              <ArrowUp className="h-5 w-5 text-muted-foreground" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 