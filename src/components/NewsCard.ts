import { IArticle } from '../types/types';

export class NewsCard {
  public render(article: Pick<IArticle, 'title' | 'description' | 'url' | 'urlToImage'>): HTMLElement {
    const template = document.getElementById('newsItemTemp') as HTMLTemplateElement;
    const clone = template.content.cloneNode(true) as DocumentFragment;

    const img = clone.querySelector('.news-card__image') as HTMLImageElement;
    const title = clone.querySelector('.news-card__title') as HTMLElement;
    const description = clone.querySelector('.news-card__description') as HTMLElement;
    const link = clone.querySelector('.news-card__link') as HTMLAnchorElement;
    // Добавляем поиск источника
    const source = clone.querySelector('.news-card__source') as HTMLElement;

    // Заполняем картинку (если нет — заглушка)
    if (article.urlToImage) {
      img.src = article.urlToImage;
    } else {
      img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18d%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23eee%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.5%22%20y%3D%22104.5%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
    }
    img.alt = article.title;

    // Заполняем текст
    title.textContent = article.title;
    description.textContent = article.description || 'Описание отсутствует';
    
    // В вашем интерфейсе IArticle есть source. Если нет - закомментируйте или поставьте заглушку
    source.textContent = 'NEWS PORTAL'; 
    
    link.href = article.url;

    return clone.firstElementChild as HTMLElement;
  }
}