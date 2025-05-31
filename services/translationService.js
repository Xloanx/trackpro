
interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
}

interface LanguageDetectionResult {
  language: string;
  confidence: number;
  alternatives?: Array<{
    language: string;
    confidence: number;
  }>;
}

export class TranslationService {
  private apiBaseUrl = 'https://api.trackpro.com';
  
  // Supported languages
  private supportedLanguages: SupportedLanguage[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska' }
  ];

  // Get supported languages
  getSupportedLanguages(): SupportedLanguage[] {
    return this.supportedLanguages;
  }

  // Detect language of text
  async detectLanguage(text: string): Promise<LanguageDetectionResult> {
    try {
      console.log('Detecting language for text:', text.substring(0, 50));
      
      // Simulate API call to language detection service
      const response = await fetch(`${this.apiBaseUrl}/translate/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TRANSLATION_API_TOKEN}`
        },
        body: JSON.stringify({ text })
      });
      
      if (!response.ok) {
        throw new Error('Language detection failed');
      }
      
      const result = await response.json();
      
      return {
        language: result.language || 'en',
        confidence: result.confidence || 0.9,
        alternatives: result.alternatives || []
      };
    } catch (error) {
      console.error('Language detection error:', error);
      
      // Fallback: simple language detection based on common patterns
      return this.fallbackLanguageDetection(text);
    }
  }

  // Translate text
  async translateText(
    text: string, 
    targetLanguage: string, 
    sourceLanguage?: string
  ): Promise<TranslationResult> {
    try {
      console.log(`Translating text to ${targetLanguage}:`, text.substring(0, 50));
      
      // If source language not provided, detect it first
      if (!sourceLanguage) {
        const detection = await this.detectLanguage(text);
        sourceLanguage = detection.language;
      }
      
      // Skip translation if source and target are the same
      if (sourceLanguage === targetLanguage) {
        return {
          originalText: text,
          translatedText: text,
          sourceLanguage,
          targetLanguage,
          confidence: 1.0
        };
      }
      
      // Simulate API call to translation service (Google Translate, Azure Translator, etc.)
      const response = await fetch(`${this.apiBaseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TRANSLATION_API_TOKEN}`
        },
        body: JSON.stringify({
          text,
          source: sourceLanguage,
          target: targetLanguage
        })
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const result = await response.json();
      
      return {
        originalText: text,
        translatedText: result.translatedText || text,
        sourceLanguage,
        targetLanguage,
        confidence: result.confidence || 0.9
      };
    } catch (error) {
      console.error('Translation error:', error);
      
      // Fallback: return original text
      return {
        originalText: text,
        translatedText: text,
        sourceLanguage: sourceLanguage || 'unknown',
        targetLanguage,
        confidence: 0.0
      };
    }
  }

  // Translate multiple texts at once
  async translateBatch(
    texts: string[], 
    targetLanguage: string, 
    sourceLanguage?: string
  ): Promise<TranslationResult[]> {
    const results: TranslationResult[] = [];
    
    for (const text of texts) {
      const result = await this.translateText(text, targetLanguage, sourceLanguage);
      results.push(result);
    }
    
    return results;
  }

  // Get user's preferred language from browser
  getUserPreferredLanguage(): string {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const langCode = browserLang.split('-')[0]; // Extract base language code
    
    // Check if we support this language
    const supported = this.supportedLanguages.find(lang => lang.code === langCode);
    return supported ? langCode : 'en';
  }

  // Format text for RTL languages
  formatForRTL(text: string, languageCode: string): string {
    const language = this.supportedLanguages.find(lang => lang.code === languageCode);
    
    if (language?.rtl) {
      return `<span dir="rtl">${text}</span>`;
    }
    
    return text;
  }

  // Translate UI elements
  async translateUIElements(elements: Record<string, string>, targetLanguage: string): Promise<Record<string, string>> {
    const translatedElements: Record<string, string> = {};
    
    for (const [key, text] of Object.entries(elements)) {
      const result = await this.translateText(text, targetLanguage);
      translatedElements[key] = result.translatedText;
    }
    
    return translatedElements;
  }

  // Fallback language detection using simple patterns
  private fallbackLanguageDetection(text: string): LanguageDetectionResult {
    const lowerText = text.toLowerCase();
    
    // Simple pattern matching for common languages
    if (/[áéíóúñ]/.test(lowerText)) {
      return { language: 'es', confidence: 0.7 };
    }
    if (/[àâäéèêëïîôöùûüÿç]/.test(lowerText)) {
      return { language: 'fr', confidence: 0.7 };
    }
    if (/[äöüß]/.test(lowerText)) {
      return { language: 'de', confidence: 0.7 };
    }
    if (/[àáâãçéêíóôõú]/.test(lowerText)) {
      return { language: 'pt', confidence: 0.7 };
    }
    if (/[\u0600-\u06FF]/.test(text)) {
      return { language: 'ar', confidence: 0.8 };
    }
    if (/[\u4e00-\u9fff]/.test(text)) {
      return { language: 'zh', confidence: 0.8 };
    }
    if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
      return { language: 'ja', confidence: 0.8 };
    }
    if (/[\uac00-\ud7af]/.test(text)) {
      return { language: 'ko', confidence: 0.8 };
    }
    if (/[\u0900-\u097f]/.test(text)) {
      return { language: 'hi', confidence: 0.8 };
    }
    if (/[\u0400-\u04ff]/.test(text)) {
      return { language: 'ru', confidence: 0.8 };
    }
    
    // Default to English
    return { language: 'en', confidence: 0.5 };
  }
}

export const translationService = new TranslationService();
