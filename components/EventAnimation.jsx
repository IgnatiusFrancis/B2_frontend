import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Music, Users, Sparkles, Clock, Calendar } from 'lucide-react';

const AnimatedVenue = ({ event }) => {
  const pulseVariant = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatVariant = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative h-64 md:h-80 rounded-xl shadow-lg bg-gradient-to-br from-purple-600/10 to-pink-600/10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1, 0.8],
              x: [0, 30, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Central Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
        {/* Location Pin Animation */}
        <motion.div
          variants={pulseVariant}
          initial="initial"
          animate="animate"
          className="mb-4"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </motion.div>

        {/* Venue Name */}
        <motion.h3
          variants={floatVariant}
          initial="initial"
          animate="animate"
          className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
        >
          {event?.location}
        </motion.h3>

        {/* Floating Icons */}
        <div className="flex justify-center gap-6 mt-4">
          {[Music, Users, Sparkles].map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{
                y: [-5, 5, -5],
                transition: {
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="bg-white/90 p-2 rounded-lg shadow-lg"
            >
              <Icon className="h-5 w-5 text-purple-600" />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-gray-700 text-sm"
        >
          <p className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(event?.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric"
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedVenue;