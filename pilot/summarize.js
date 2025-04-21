
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Middleware pour parser le JSON dans les requêtes
router.use(express.json());

// Endpoint pour résumer un texte et extraire les mots-clés
router.post('/generate', async (req, res) => {
    try {
        const { text, language = 'fr' } = req.body;

        if (!text) {
            return res.status(400).json({
                error: 'Le texte est requis'
            });
        }

        // À implémenter avec une API de résumé ou un modèle d'IA
        // Ceci est une implémentation simulée
        
        // Algorithme de résumé très simple
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordCount = {};
        
        // Compter la fréquence des mots
        words.forEach(word => {
            // Ignorer les mots courts (moins de 3 lettres)
            if (word.length < 3) return;
            
            // Ignorer les mots vides (à adapter selon la langue)
            const stopWords = {
                'fr': ['mais', 'pour', 'avec', 'dans', 'que', 'qui', 'est', 'sont', 'les', 'des', 'une', 'donc', 'car'],
                'en': ['but', 'for', 'with', 'in', 'that', 'who', 'are', 'is', 'the', 'and', 'to', 'of', 'a', 'an']
            };
            
            const stopWordsList = stopWords[language.substring(0, 2)] || stopWords['en'];
            if (stopWordsList.includes(word)) return;
            
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Extraire les mots les plus fréquents comme mots-clés
        const keywords = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(entry => entry[0]);
        
        // Générer un résumé (sélection des phrases les plus importantes)
        let summary;
        if (sentences.length <= 3) {
            summary = text; // Si le texte est court, le renvoyer tel quel
        } else {
            // Sélectionner environ 30% des phrases, mais au moins 2
            const numSentencesToKeep = Math.max(2, Math.ceil(sentences.length * 0.3));
            
            // Évaluer l'importance de chaque phrase en fonction des mots-clés qu'elle contient
            const sentenceScores = sentences.map(sentence => {
                const wordsInSentence = sentence.toLowerCase().match(/\b\w+\b/g) || [];
                let score = 0;
                keywords.forEach(keyword => {
                    if (wordsInSentence.includes(keyword)) {
                        score += 1;
                    }
                });
                return { sentence, score };
            });
            
            // Sélectionner les phrases les plus importantes
            const topSentences = sentenceScores
                .sort((a, b) => b.score - a.score)
                .slice(0, numSentencesToKeep)
                .sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence)) // Remettre dans l'ordre original
                .map(item => item.sentence);
            
            summary = topSentences.join('. ') + '.';
        }

        // Réponse formatée
        const response = {
            original: text,
            summary: summary,
            keywords: keywords,
            language: language
        };

        return res.json(response);

    } catch (error) {
        console.error('Erreur de génération de résumé:', error);
        res.status(500).json({
            error: 'Une erreur est survenue lors de la génération du résumé',
            details: error.message
        });
    }
});

module.exports = router;
