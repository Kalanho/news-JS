import { IArticle } from '../types/types';

export class NewsApi {
  // Используем прокси из задания
  private readonly baseUrl: string = 'https://rss-news-api.onrender.com/';

  // Generics для универсального запроса
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return (await response.json()) as T;
  }

  // Метод больше не принимает аргументов, так как мок-эндпоинт отдает всё подряд
  public async getTopHeadlines(): Promise<IArticle[]> {
    const url = `${this.baseUrl}mocks/everything`;
    const response = await this.fetchData<{ articles: IArticle[] }>(url);
    return response.articles;
  }
}