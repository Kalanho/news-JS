import './global.css'; // Подключаем стили
import { NewsApi } from './api/NewsApi';
import { NewsCard } from './components/NewsCard';
import { IArticle } from './types/types';

// Инициализация
const api = new NewsApi(); // Ключ не нужен, мы используем прокси
const cardRenderer = new NewsCard();
const newsContainer = document.querySelector('.news-grid') as HTMLElement;

// Отрисовка карточек
function renderNews(articles: IArticle[]): void {
  newsContainer.innerHTML = ''; // Очищаем контейнер
  
  articles.forEach((article: IArticle) => {
    const card = cardRenderer.render(article);
    newsContainer.appendChild(card);
  });
}

// Загрузка данных с прокси
async function loadNews(): Promise<void> {
  try {
    // Вызываем БЕЗ аргументов, так как мы изменили NewsApi
    const articles = await api.getTopHeadlines();
    
    // Выводим в консоль, чтобы убедиться, что данные пришли
    console.log('Данные от API:', articles); 
    
    // Если данные есть, рендерим
    if (articles && articles.length > 0) {
        renderNews(articles);
    } else {
        console.warn('Массив новостей пуст');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Ошибка загрузки:', error.message);
    }
  }
}

// Запуск
loadNews();