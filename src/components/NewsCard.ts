import { IArticle } from '../types/types';

export class NewsCard {
  // Возвращаем HTMLElement, а не строку — это безопаснее и удобнее
  public render(article: Pick<IArticle, 'title' | 'description' | 'url' | 'urlToImage'>): HTMLElement {
    // 1. Берем шаблон из HTML
    const template = document.getElementById('newsItemTemp') as HTMLTemplateElement;
    const clone = template.content.cloneNode(true) as DocumentFragment;

    // 2. Находим нужные элементы внутри клона
    const img = clone.querySelector('.news-card__image') as HTMLImageElement;
    const title = clone.querySelector('.news-card__title') as HTMLElement;
    const description = clone.querySelector('.news-card__description') as HTMLElement;
    const link = clone.querySelector('.news-card__link') as HTMLAnchorElement;

    // 3. Безопасно заполняем данными (без использования any)
    
    // Картинка: если нет urlToImage, подставляем серую заглушку (SVG)
    // Это сохранит сетку идеально ровной
    if (article.urlToImage) {
      img.src = article.urlToImage;
    } else {
      // Картинка-заглушка "No Image"
      img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18d%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23eee%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.5%22%20y%3D%22104.5%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
    }
    img.alt = article.title;

    // Текст (textContent защищает от XSS-атак)
    title.textContent = article.title;
    description.textContent = article.description || 'Описание отсутствует';
    
    // Ссылка
    link.href = article.url;

    // 4. Возвращаем готовый DOM-элемент
    return clone.firstElementChild as HTMLElement;
  }
}

// Использование Function Type для обработчика событий
export type ClickHandler = (event: MouseEvent) => void;

export function setupCardClick(handler: ClickHandler): void {
  document.addEventListener('click', (event) => {
    // Проверка типа события
    if (event.target instanceof HTMLElement) {
       handler(event);
    }
  });
}