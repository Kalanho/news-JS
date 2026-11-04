import { IArticle } from './types/types';
import { NewsApi } from './api/NewsApi';

// Используем Partial, так как данные могут подгружаться не сразу
let currentArticles: Partial<IArticle[]> = [];

const api = new NewsApi('YOUR_API_KEY');

async function loadNews(): Promise<void> {
  try {
    const response = await api.getTopHeadlines();
    currentArticles = response.articles;
    renderNews(currentArticles);
  } catch (error) {
    console.error(error);
  }
}

// Типизация функции, которая не возвращает значение (void)
function renderNews(articles: Partial<IArticle[]>): void {
  const container = document.getElementById('news-container');
  if (container) {
    // ... логика рендера
  }
}

loadNews();