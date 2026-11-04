import { IArticle, ISource } from '../types/types';

export class NewsApi {
  private readonly baseUrl: string = 'https://rss-news-api.onrender.com/';

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  }


  public async getSources(): Promise<ISource[]> {
    const url = `${this.baseUrl}mocks/sources`;
 
    const response = await this.fetchData<{ sources: ISource[] }>(url);
    return response.sources;
  }

  public async getTopHeadlines(): Promise<IArticle[]> {
    const url = `${this.baseUrl}mocks/everything`;
    const response = await this.fetchData<{ articles: IArticle[] }>(url);
    return response.articles;
  }
}