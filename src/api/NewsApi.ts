import { NewsApiResponse, NewsCategory, NewsLanguage } from '../types/types';

export class NewsApi {
  // private модификатор для сокрытия ключа и базового URL
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://newsapi.org/v2';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Использование Generics <T> для универсального метода запроса
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: { 'X-Api-Key': this.apiKey },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return (await response.json()) as T;
  }

  // public метод для получения новостей
  public async getTopHeadlines(
    category: NewsCategory = NewsCategory.GENERAL,
    language: NewsLanguage = NewsLanguage.EN
  ): Promise<NewsApiResponse> {
    const url = `${this.baseUrl}/top-headlines?category=${category}&language=${language}`;
    return this.fetchData<NewsApiResponse>(url);
  }
}