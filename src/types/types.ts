// Объектные типы (Object Types) для ответа API
export interface ISource {
    id: string | null;
    name: string;
  }
  
  export interface IArticle {
    source: ISource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }
  
  // Использование Utility Type (Readonly) для неизменяемого ответа
  export type NewsApiResponse = Readonly<{
    status: string;
    totalResults: number;
    articles: IArticle[];
  }>;
  
  // Enums для категорий и языков
  export enum NewsCategory {
    BUSINESS = 'business',
    ENTERTAINMENT = 'entertainment',
    GENERAL = 'general',
    HEALTH = 'health',
    SCIENCE = 'science',
    SPORTS = 'sports',
    TECHNOLOGY = 'technology',
  }
  
  export enum NewsLanguage {
    EN = 'en',
    RU = 'ru',
    // добавьте нужные языки
  }