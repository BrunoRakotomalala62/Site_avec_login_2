import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Video, Headphones, Image, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const resources = [
  {
    id: 1,
    title: 'PDF Éducatifs',
    description: 'Manuels scolaires et guides d\'apprentissage complets',
    icon: FileText,
    count: 1250,
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Vidéos Tutoriels',
    description: 'Leçons vidéo et démonstrations pratiques interactives',
    icon: Video,
    count: 890,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Podcasts Éducatifs',
    description: 'Contenus audio pour l\'apprentissage en déplacement',
    icon: Headphones,
    count: 456,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 4,
    title: 'Infographies',
    description: 'Informations visuelles sur divers sujets pédagogiques',
    icon: Image,
    count: 678,
    color: 'from-orange-500 to-yellow-500',
  },
];

const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = target / (duration * 60);
    let animationFrameId: number;

    const animate = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const ResourceCard = ({ resource, index }: { resource: typeof resources[0]; index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = resource.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <motion.div
        className="glass-dark h-full p-8 rounded-2xl text-center group cursor-pointer relative overflow-hidden"
        whileHover={{ y: -5 }}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with Animation */}
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center mx-auto mb-4`}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>

          {/* Description */}
          <p className="text-white/70 text-sm mb-6">{resource.description}</p>

          {/* Counter */}
          <motion.div
            className="mb-6 p-4 bg-white/5 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-accent mb-1">
              <AnimatedCounter target={resource.count} />+
            </div>
            <div className="text-white/60 text-xs">Ressources disponibles</div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Accéder
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ResourcesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="resources" className="py-20 md:py-32 relative overflow-hidden bg-white/2">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-premium">Ressources Pédagogiques</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Accédez à nos ressources téléchargeables et matériels d\'apprentissage
            de haute qualité pour enrichir votre parcours éducatif.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Ressources totales', value: 3274 },
            { label: 'Utilisateurs actifs', value: 12500 },
            { label: 'Téléchargements', value: 45890 },
            { label: 'Satisfaction', value: 98 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-dark p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">
                <AnimatedCounter target={stat.value} />
                {stat.label.includes('Satisfaction') && '%'}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
