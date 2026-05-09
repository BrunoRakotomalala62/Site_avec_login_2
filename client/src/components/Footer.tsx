import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { useState } from 'react';

const footerLinks = [
  { label: 'Accueil', href: '#' },
  { label: 'Cours', href: '#' },
  { label: 'Ressources', href: '#' },
  { label: 'Quiz', href: '#' },
  { label: 'Chatbot', href: '#' },
  { label: 'À propos', href: '#' },
];

const socialLinks = [
  { icon: Facebook, color: 'hover:text-blue-500' },
  { icon: Twitter, color: 'hover:text-cyan-500' },
  { icon: Instagram, color: 'hover:text-pink-500' },
  { icon: Youtube, color: 'hover:text-red-500' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-dark opacity-90" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer */}
        <div className="container py-16 md:py-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EM</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">Éducation Malagasy</h3>
                  <p className="text-accent text-xs">Premium Edition</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Apprendre, Découvrir, Grandir. Votre plateforme éducative premium pour
                l\'excellence académique.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/70 text-sm">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  contact@educationmalagasy.com
                </li>
                <li className="flex items-center gap-2 text-white/70 text-sm">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  +261 20 12 345 67
                </li>
                <li className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                  Antananarivo, Madagascar
                </li>
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <p className="text-white/70 text-sm mb-4">
                Inscrivez-vous pour recevoir nos dernières mises à jour et ressources.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <motion.button
                  type="submit"
                  className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent text-xs mt-2"
                >
                  ✓ Merci de votre inscription !
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Copyright */}
            <motion.p
              variants={itemVariants}
              className="text-white/70 text-sm text-center md:text-left"
            >
              &copy; 2024 Éducation Malagasy Premium. Tous droits réservés.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href="#"
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color}`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex gap-4 text-white/70 text-sm"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                variants={itemVariants}
                className="hover:text-accent transition-colors"
              >
                Politique de confidentialité
              </motion.a>
              <span className="text-white/30">•</span>
              <motion.a
                href="#"
                variants={itemVariants}
                className="hover:text-accent transition-colors"
              >
                Conditions d\'utilisation
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </footer>
  );
}
