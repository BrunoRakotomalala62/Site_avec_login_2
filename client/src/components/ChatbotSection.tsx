import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, MessageCircle, CheckCircle } from 'lucide-react';

const initialMessages = [
  { id: 1, type: 'bot', text: 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?' },
  { id: 2, type: 'user', text: 'Peux-tu me parler de l\'histoire de Madagascar ?' },
  { id: 3, type: 'bot', text: 'Bien sûr ! Madagascar a une histoire fascinante qui remonte à plus de 2000 ans...' },
];

const features = [
  { icon: MessageCircle, text: 'Réponses instantanées' },
  { icon: CheckCircle, text: 'Assistance multilingue' },
  { icon: CheckCircle, text: 'Informations vérifiées' },
  { icon: CheckCircle, text: 'Ressources complémentaires' },
];

const TypingIndicator = () => (
  <div className="flex gap-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-accent rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
      />
    ))}
  </div>
);

const MessageBubble = ({ message, index }: { message: typeof initialMessages[0]; index: number }) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, x: isBot ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-xs px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-white/10 text-white rounded-bl-none'
            : 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-none'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </motion.div>
  );
};

export default function ChatbotSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: 'C\'est une excellente question ! Laissez-moi vous fournir plus d\'informations sur ce sujet...',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="chatbot" className="py-20 md:py-32 relative overflow-hidden bg-white/2">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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
            <span className="text-premium">Chatbot Éducatif</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Notre assistant virtuel intelligent est disponible 24/7 pour répondre
            à vos questions et vous guider dans votre apprentissage.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Chatbot Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-dark rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-white font-semibold">Assistant Malagasy</h3>
                <span className="text-white/80 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  En ligne
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-black/20">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <MessageBubble key={message.id} message={message} index={index} />
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start mb-4"
                  >
                    <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-none">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
              />
              <motion.button
                onClick={handleSendMessage}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Fonctionnalités du Chatbot
            </h3>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 glass-dark rounded-lg"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Icon className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-white font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.button
              className="btn-premium w-full py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discuter maintenant
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
