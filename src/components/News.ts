import '../css/news.css';
import { NewsArticle } from '../types/types';

class News {
    public draw(data: NewsArticle[]): void {
        const news = data.slice(0, 10); // Берем первые 10 новостей

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        if (!newsItemTemp) {
            console.warn('Template #newsItemTemp not found');
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const getElement = (selector: string): HTMLElement => {
                return newsClone.querySelector(selector) as HTMLElement;
            };

            if (idx % 2) {
                getElement('.news__item')?.classList.add('alt');
            }

            const imageUrl = item.urlToImage || 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20200%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23222%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22100%22%20fill%3D%22%23666%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
            getElement('.news__meta-photo').style.backgroundImage = `url(${imageUrl})`;

            const author = item.author || item.source?.name || 'Неизвестный автор';
            getElement('.news__meta-author').textContent = author;

            const dateStr = item.publishedAt ? item.publishedAt.slice(0, 10) : '';
            getElement('.news__meta-date').textContent = dateStr.split('-').reverse().join('-');

            getElement('.news__description-title').textContent = item.title || 'Без заголовка';
            getElement('.news__description-source').textContent = item.source?.name || 'Неизвестный источник';
            getElement('.news__description-content').textContent = item.description || '';

            const linkEl = getElement('.news__read-more a');
            if (item.url) {
                linkEl.setAttribute('href', item.url);
            } else {
                linkEl.style.display = 'none';
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;