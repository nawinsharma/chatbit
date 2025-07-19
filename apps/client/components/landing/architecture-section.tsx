"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Smartphone,
  Server,
  Database,
  Network,
  ArrowRight,
  Users,
  Globe,
  Cpu
} from "lucide-react";

const architectureFlow = [
  {
    icon: Smartphone,
    title: "Client",
    description: "React + Socket.io",
    color: "from-blue-500 to-blue-600",
    position: "left",
  },
  {
    icon: Server,
    title: "Socket.io Server",
    description: "Real-time Gateway",
    color: "from-green-500 to-green-600",
    position: "center-left",
  },
  {
    icon: Database,
    title: "Redis",
    description: "Message Broker",
    color: "from-red-500 to-red-600",
    position: "center-right",
  },
  {
    icon: Network,
    title: "Kafka",
    description: "Event Streaming",
    color: "from-purple-500 to-purple-600",
    position: "right",
  },
];

const scalingFeatures = [
  {
    icon: Users,
    metric: "1M+",
    label: "Concurrent Users",
    description: "Handle millions of simultaneous connections"
  },
  {
    icon: Globe,
    metric: "99.9%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability and availability"
  },
  {
    icon: Cpu,
    metric: "<1ms",
    label: "Message Latency",
    description: "Ultra-low latency real-time communication"
  }
];

export default function ArchitectureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Industry-Grade{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scalability
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our architecture is designed for fault tolerance, horizontal scaling, and ultra-low latency. 
            See how messages flow seamlessly from client to user across our distributed infrastructure.
          </p>
        </motion.div>

        {/* Architecture Flow Diagram */}
        <div className="relative mb-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 relative">
            {architectureFlow.map((component, index) => (
              <div key={component.title} className="flex flex-col md:flex-row items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Pulsing Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${component.color} opacity-30`}
                  />
                  
                  {/* Main Component */}
                  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${component.color} flex items-center justify-center shadow-xl`}>
                    <component.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Component Info */}
                  <div className="text-center mt-4 md:mt-0 md:ml-0">
                    <h3 className="font-semibold text-foreground">{component.title}</h3>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </div>
                </motion.div>

                {/* Animated Arrow (except for last item) */}
                {index < architectureFlow.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    className="hidden md:block"
                  >
                    <motion.div
                      animate={{
                        x: [0, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      <ArrowRight className="h-8 w-8 text-blue-500" />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Animated Message Flow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-1/2 left-0 right-0 pointer-events-none hidden md:block"
          >
            <motion.div
              animate={{
                x: [0, 1200],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
              className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
            />
          </motion.div>
        </div>

        {/* Scaling Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {scalingFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 shadow-lg"
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <div className="text-3xl font-bold text-foreground mb-2">{feature.metric}</div>
              <div className="text-lg font-semibold text-foreground mb-2">{feature.label}</div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <div className="bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-border/50">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <p className="text-muted-foreground leading-relaxed">
              Messages flow from clients through our Socket.io gateway servers, which handle real-time 
              connections and authentication. Redis acts as a high-speed message broker for immediate 
              delivery, while Kafka ensures reliable event streaming and persistence. This architecture 
              enables horizontal scaling, fault tolerance, and sub-millisecond message delivery.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 