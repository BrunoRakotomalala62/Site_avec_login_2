
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

        // Récupération de la clé API depuis les variables d'environnement
        const TEXTGEARS_API_KEY = process.env.TEXTGEARS_API_KEY;

        if (!TEXTGEARS_API_KEY) {
            console.error('Clé API TextGears manquante');
            return res.status(500).json({
                error: 'Configuration du service incomplète'
            });
        }

        // Conversion du code de langue pour TextGears
        const langCode = 
            language === 'fr' ? 'fr-FR' : 
            language === 'en-US' ? 'en-US' :
            language === 'en-GB' ? 'en-GB' :
            language === 'en-ZA' ? 'en-ZA' :
            language === 'en-AU' ? 'en-AU' :
            language === 'en-NZ' ? 'en-NZ' :
            language === 'en' ? 'en-GB' :
            language === 'de-DE' ? 'de-DE' :
            language === 'de-AT' ? 'de-AT' :
            language === 'de-CH' ? 'de-CH' :
            language === 'de' ? 'de-DE' :
            language === 'pt-PT' ? 'pt-PT' :
            language === 'pt-BR' ? 'pt-BR' :
            language === 'it-IT' ? 'it-IT' :
            language === 'it' ? 'it-IT' :
            language === 'ar-AR' ? 'ar-AR' :
            language === 'ru-RU' ? 'ru-RU' :
            language === 'es-ES' ? 'es-ES' :
            language === 'es' ? 'es-ES' :
            language === 'ja-JP' ? 'ja-JP' :
            language === 'zh-CN' ? 'zh-CN' :
            language === 'el-GR' ? 'el-GR' : 'en-GB';

        // Appel à l'API TextGears pour le résumé
        const apiResponse = await axios.get('https://api.textgears.com/summarize', {
            params: {
                text: text,
                language: langCode,
                key: TEXTGEARS_API_KEY
            }
        });

        // Traitement de la réponse de l'API
        if (apiResponse.data && apiResponse.data.status) {
            const keywords = apiResponse.data.response?.keywords || [];
            const summary = apiResponse.data.response?.summary?.join(' ') || text;
            const highlight = apiResponse.data.response?.highlight || [];

            // Création de la réponse
            const response = {
                original: text,
                summary: summary,
                keywords: keywords,
                highlights: highlight,
                language: language
            };

            return res.json(response);
        } else {
            throw new Error('Réponse invalide de l\'API TextGears');
        }

    } catch (error) {
        console.error('Erreur de génération de résumé:', error);
        res.status(500).json({
            error: 'Une erreur est survenue lors de la génération du résumé',
            details: error.message
        });
    }
});

module.exports = router;
