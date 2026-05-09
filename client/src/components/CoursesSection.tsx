import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Code, Palette, Globe, Zap, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Langue Malagasy',
    description: 'Apprentissage complet de la langue malagasy et dialectes régionaux',
    icon: BookOpen,
    level: 'Débutant',
    students: '2,450',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Histoire & Culture',
    description: 'Découvrez l\'histoire riche et la culture diverse de Madagascar',
    icon: Globe,
    level: 'Intermédiaire',
    students: '1,890',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Géographie',
    description: 'Exploration des régions et de la biodiversité unique de l\'île',
    icon: Palette,
    level: 'Avancé',
    students: '1,234',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    title: 'Informatique',
    description: 'Développement web et programmation pour les étudiants malagasy',
    icon: Code,
    level: 'Débutant',
    students: '3,120',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'Sciences',
    description: 'Physique, chimie et biologie avec approche pratique',
    icon: Zap,
    level: 'Intermédiaire',
    students: '2,890',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'Littérature',
    description: 'Littérature malagasy et francophone avec analyses approfondies',
    icon: Users,
    level: 'Avancé',
    students: '1,567',
    color: 'from-indigo-500 to-purple-500',
  },
];

const CourseCard = ({ course, index }: { course: typeof courses[0]; index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = course.icon;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 text-green-700';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-700';
      case 'Avancé':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, rotateX: 5 }}
      className="h-full"
    >
      <motion.div
        className="glass-dark h-full p-6 rounded-2xl cursor-pointer group overflow-hidden relative transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        {/* Gradient Background on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>

          {/* Description */}
          <p className="text-white/70 text-sm mb-4 line-clamp-2">{course.description}</p>

          {/* Level Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
            <span className="text-accent text-xs font-semibold">{course.students} étudiants</span>
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm transition-all duration-300 hover:opacity-90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir le cours
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CoursesSection() {
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
    <section id="courses" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-premium">Nos Cours Premium</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explorez notre variété de cours conçus pour tous les niveaux avec des contenus
            interactifs et des ressources pédagogiques complètes.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="btn-premium px-8 py-4 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir tous les cours
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
