import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Zap, Globe } from 'lucide-react';

const timelineEvents = [
  {
    year: '2020',
    title: 'Fondation',
    description: 'Lancement de la plateforme Éducation Malagasy',
    icon: Zap,
  },
  {
    year: '2021',
    title: '1000 Étudiants',
    description: 'Atteinte du premier millier d\'utilisateurs actifs',
    icon: Users,
  },
  {
    year: '2022',
    title: 'Expansion',
    description: 'Extension des cours et ressources pédagogiques',
    icon: Globe,
  },
  {
    year: '2024',
    title: 'Excellence',
    description: 'Reconnaissance comme plateforme éducative premium',
    icon: Award,
  },
];

const TimelineItem = ({ event, index, isLeft }: { event: typeof timelineEvents[0]; index: number; isLeft: boolean }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const Icon = event.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex gap-8 items-center ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <div className="flex-1">
        <motion.div
          className="glass-dark p-6 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-accent font-bold text-lg">{event.year}</span>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
          <p className="text-white/70 text-sm">{event.description}</p>
        </motion.div>
      </div>

      {/* Timeline Center */}
      <motion.div
        className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default function AboutSection() {
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
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

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
            <span className="text-premium">À Propos de Nous</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez notre histoire, notre mission et notre vision pour l\'éducation malagasy.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Notre Mission</h3>
            <p className="text-white/80 leading-relaxed">
              Nous sommes dédiés à rendre l\'éducation malagasy accessible à tous, en préservant
              et promouvant la richesse culturelle et linguistique de Madagascar. Notre objectif
              est de créer une plateforme inclusive et innovante.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Notre Vision</h3>
            <p className="text-white/80 leading-relaxed">
              Devenir la référence en matière de ressources éducatives malagasy en ligne,
              contribuant à l\'éducation de qualité et à la préservation du patrimoine culturel
              pour les générations futures.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="space-y-12 mb-16">
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={event.year}
              event={event}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-dark p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Notre Équipe</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Notre équipe est composée d\'éducateurs passionnés, de développeurs talentueux
            et de passionnés de la culture malagasy, tous déterminés à offrir une expérience
            d\'apprentissage exceptionnelle et innovante.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Bruno', role: 'Fondateur' },
              { name: 'Marie', role: 'Directrice Pédagogique' },
              { name: 'Jean', role: 'Lead Developer' },
              { name: 'Sophie', role: 'Designer' },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white/5 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-2" />
                <div className="text-white font-semibold text-sm">{member.name}</div>
                <div className="text-accent text-xs">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
