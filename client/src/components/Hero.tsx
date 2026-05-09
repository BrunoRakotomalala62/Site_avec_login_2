import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-accent rounded-full"
    initial={{
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 0,
    }}
    animate={{
      y: [0, -100],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 2,
    }}
  />
);

export default function Hero() {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => i));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 gradient-primary opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((i) => (
          <Particle key={i} delay={i * 0.15} />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-block mb-6"
        >
          <div className="glass px-4 py-2 rounded-full">
            <span className="text-accent font-semibold text-sm">
              ✨ Bienvenue sur notre plateforme premium
            </span>
          </div>
        </motion.div>

        {/* Main Title with Typewriter Effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="text-premium">Éducation</span>
            <br />
            <span className="animate-typewriter">Malagasy Premium</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
        >
          Découvrez une plateforme éducative révolutionnaire avec des cours interactifs,
          des ressources pédagogiques premium et une expérience d'apprentissage immersive.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            className="btn-premium px-8 py-4 text-lg shadow-glow animate-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer maintenant
          </motion.button>
          <motion.button
            className="btn-premium-outline px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            En savoir plus
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-12"
        >
          {[
            { number: '500+', label: 'Cours' },
            { number: '10K+', label: 'Étudiants' },
            { number: '98%', label: 'Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="glass px-4 py-4 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {stat.number}
              </div>
              <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-accent" />
      </motion.div>
    </section>
  );
}
