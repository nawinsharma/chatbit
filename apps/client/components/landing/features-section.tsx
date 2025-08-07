"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  MessageSquare, 
  Scaling, 
  Shield, 
  Layers,
  Zap,
  Globe,
  Lock,
  Code
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Real-Time Messaging",
    description: "Socket.io driven instant updates with zero latency. Experience seamless communication that feels truly live.",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.1,
  },
  {
    icon: Scaling,
    title: "Horizontal Scalability", 
    description: "Kafka and Redis integration for efficient message brokering. Scale to millions of concurrent users effortlessly.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.2,
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "Better Auth for identity management, robust session handling, and multi-factor authentication support.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.3,
  },
  {
    icon: Layers,
    title: "Modern Stack",
    description: "Next.js for SSR, Turborepo for monorepo management, and cutting-edge development practices.",
    gradient: "from-orange-500 to-red-500",
    delay: 0.4,
  },
];

const additionalFeatures = [
  { icon: Zap, text: "Lightning fast performance" },
  { icon: Globe, text: "Global CDN distribution" },
  { icon: Lock, text: "End-to-end encryption" },
  { icon: Code, text: "Developer-friendly APIs" },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Why Choose Our{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Scalable Chat App?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with industry-leading technologies and best practices to deliver 
            unmatched performance, security, and developer experience.
          </p>
        </motion.div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: feature.delay }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {additionalFeatures.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50 backdrop-blur-sm"
            >
              <item.icon className="h-8 w-8 mb-3 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 