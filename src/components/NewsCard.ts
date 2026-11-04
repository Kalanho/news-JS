import { IArticle } from '../types/types';

export class NewsCard {
  // Использование Utility Type Pick — берем только нужные поля
  public render(article: Pick<IArticle, 'title' | 'description' | 'url' | 'urlToImage'>): string {
    return `
      <div class="card">
        <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description || 'Описание отсутствует'}</p>
        <a href="${article.url}" target="_blank">Читать далее</a>
      </div>
    `;
  }
}

// Использование Function Type для обработчика событий
export type ClickHandler = (event: MouseEvent) => void;

export function setupCardClick(handler: ClickHandler): void {
  document.addEventListener('click', (event) => {
    // проверка типа события
    if (event.target instanceof HTMLElement) {
       handler(event);
    }
  });
}