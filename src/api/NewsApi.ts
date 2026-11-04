import { IArticle } from '../types/types';
import { NewsCategory } from '../types/enums';

export class NewsApi {
  private readonly apiKey: string;
  // ⚠️ ВАЖНО: Используем прокси из задания для деплоя на GitHub Pages
  private readonly baseUrl: string = 'https://rss-news-api.onrender.com/';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Generics для универсального запроса
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      // Прокси от RSSchool может не требовать ключ, но если требует - передаем
      headers: {
         'X-Api-Key': this.apiKey,
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return (await response.json()) as T;
  }

  public async getTopHeadlines(category: NewsCategory): Promise<IArticle[]> {
    // Формируем URL запроса
    const url = `${this.baseUrl}top-headlines?category=${category}&language=en&apiKey=${this.apiKey}`;
    
    // Прокси возвращает объект { status, totalResults, articles }
    // Нам нужно вытащить оттуда только массив articles
    const response = await this.fetchData<{ articles: IArticle[] }>(url);
    return response.articles;
  }
}