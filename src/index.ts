// 1. Объявляем process для TypeScript (чтобы он не ругался)
declare const process: { env: { API_KEY: string } };

import './global.css'; // Подключаем стили
import { NewsApi } from './api/NewsApi';
import { NewsCard } from './components/NewsCard';
import { IArticle } from './types/types';
import { NewsCategory } from './types/enums'; // Используем enum

// Инициализация
const api = new NewsApi(process.env.API_KEY || '');
const cardRenderer = new NewsCard();
const newsContainer = document.querySelector('.news-grid') as HTMLElement;

// Функция отрисовки (типизирована, ничего не возвращает -> void)
function renderNews(articles: IArticle[]): void {
  newsContainer.innerHTML = ''; // Очищаем контейнер
  
  articles.forEach((article: IArticle) => {
    const card = cardRenderer.render(article);
    newsContainer.appendChild(card);
  });
}

// Асинхронная загрузка данных
async function loadNews(): Promise<void> {
  try {
    // Пример использования Enum
    const articles = await api.getTopHeadlines(NewsCategory.GENERAL);
    renderNews(articles);
  } catch (error: unknown) {
    // Обработка ошибки без any
    if (error instanceof Error) {
      console.error('Failed to load news:', error.message);
    }
  }
}

// Запуск
loadNews();