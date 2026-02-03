const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4040;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques de manière robuste
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'utils')));

// Route principale qui redirige vers la page de connexion
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'utils', 'login.html'));
});

// Route pour index.html
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Vérification des identifiants
app.post('/verify-login', (req, res) => {
  const { email, password } = req.body;

  try {
    const clePath = path.join(__dirname, 'utils', 'cle.txt');
    if (!fs.existsSync(clePath)) {
        console.error('Fichier cle.txt introuvable');
        return res.status(500).json({ success: false, message: 'Configuration manquante' });
    }
    
    const credentials = fs.readFileSync(clePath, 'utf8');
    const lines = credentials.trim().split('\n');

    const validEmail = lines[0]?.trim();
    const validPassword = lines[2]?.trim();

    if (email === validEmail && password === validPassword) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des identifiants:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Chargement conditionnel des routeurs pour éviter les crashs si les clés API manquent
try {
    const geminiModule = require('./pilot/gemini');
    if (geminiModule && geminiModule.router) {
        app.use('/api', geminiModule.router);
    }
} catch (e) { console.error("Erreur chargement Gemini:", e.message); }

try {
    const quizRouter = require('./pilot/quiz');
    app.use('/api/quiz', quizRouter);
} catch (e) { console.error("Erreur chargement Quiz:", e.message); }

try {
    const ohabolanaRouter = require('./pilot/ohabolana');
    app.use('/api/ohabolana', ohabolanaRouter);
} catch (e) { console.error("Erreur chargement Ohabolana:", e.message); }

try {
    const horoscopeRouter = require('./pilot/horoscope');
    app.use('/api/horoscope', horoscopeRouter);
} catch (e) { console.error("Erreur chargement Horoscope:", e.message); }

try {
    const grammarRouter = require('./pilot/grammar');
    app.use('/api/grammar', grammarRouter);
} catch (e) { console.error("Erreur chargement Grammar:", e.message); }

try {
    const summarizeRouter = require('./pilot/summarize');
    app.use('/api/summarize', summarizeRouter);
} catch (e) { console.error("Erreur chargement Summarize:", e.message); }

// Routes pour les pages spécifiques
app.get('/chat/chatbot', (req, res) => res.sendFile(path.join(__dirname, 'public', 'chat', 'chatbot.html')));
app.get('/index/A-propos/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index', 'A-propos', 'contact.html')));
app.get('/francais', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index', 'Francais', 'francais.html')));
app.get('/grammaire', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index', 'Francais', 'grammaire.html')));
app.get('/summarize', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index', 'Francais', 'summarize.html')));

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose a mal tourné !');
});

// Export pour Vercel
module.exports = app;

// Démarrage local
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
}
