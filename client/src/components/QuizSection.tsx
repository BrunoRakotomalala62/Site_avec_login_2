import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Zap, Brain } from 'lucide-react';

const quizzes = [
  {
    id: 1,
    title: 'Culture Générale Malagasy',
    difficulty: 'Facile',
    questions: 20,
    avgTime: '15 min',
    participants: 2450,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 2,
    title: 'Faune et Flore Endémiques',
    difficulty: 'Intermédiaire',
    questions: 30,
    avgTime: '25 min',
    participants: 1890,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Histoire Précoloniale',
    difficulty: 'Avancé',
    questions: 40,
    avgTime: '35 min',
    participants: 1234,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'Géographie des Régions',
    difficulty: 'Intermédiaire',
    questions: 25,
    avgTime: '20 min',
    participants: 2100,
    color: 'from-orange-500 to-red-500',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile':
      return 'bg-green-100 text-green-700';
    case 'Intermédiaire':
      return 'bg-yellow-100 text-yellow-700';
    case 'Avancé':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const QuizCard = ({ quiz, index }: { quiz: typeof quizzes[0]; index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const difficulty = quiz.difficulty;
  const progress = difficulty === 'Facile' ? 33 : difficulty === 'Intermédiaire' ? 66 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        className="glass-dark h-full p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
        whileHover={{ scale: 1.02, y: -5 }}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${quiz.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{quiz.title}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            </div>
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${quiz.color} flex items-center justify-center flex-shrink-0`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Trophy className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-accent text-sm font-bold">{quiz.questions}</div>
              <div className="text-white/60 text-xs">Questions</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-accent text-sm font-bold">{quiz.avgTime}</div>
              <div className="text-white/60 text-xs">Temps moyen</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-accent text-sm font-bold">{quiz.participants.toLocaleString()}</div>
              <div className="text-white/60 text-xs">Participants</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-xs">Difficulté</span>
              <span className="text-accent text-xs font-semibold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${quiz.color}`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${progress}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4" />
            Commencer le quiz
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function QuizSection() {
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
    <section id="quiz" className="py-20 md:py-32 relative overflow-hidden">
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-premium">Quiz Interactifs</span>
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Testez vos connaissances et apprenez en vous amusant avec nos quiz
            interactifs couvrant tous les domaines d\'étude.
          </p>
        </motion.div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz, index) => (
            <QuizCard key={quiz.id} quiz={quiz} index={index} />
          ))}
        </div>

        {/* Call to Action */}
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
            Voir tous les quiz
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
