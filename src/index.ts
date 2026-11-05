import './css/global.css';
import './css/news.css';
import './css/sources.css';
import AppView from './components/AppView';
import AppLoader from './api/AppLoader';
import { NewsApiResponse, SourcesApiResponse, NewsSource } from './types/types';

const view = new AppView();
const loader = new AppLoader();

// 1. Функция для загрузки списка ВСЕХ источников
function loadSources(): void {
    loader.getResp<SourcesApiResponse>({ endpoint: 'mocks/sources' }, (data: SourcesApiResponse) => {
        if (data && data.sources && data.sources.length > 0) {
            console.log(`✅ Загружено ${data.sources.length} источников!`);
            view.drawSources(data); // Передаем все источники в комбобокс
        } else {
            console.warn('⚠️ Прокси не вернул источники, используем заглушки.');
            // Если прокси молчит, показываем хотя бы эти 5
            view.drawSources({
                status: 'ok',
                sources: [
                    { id: 'bbc-news', name: 'BBC News' },
                    { id: 'cnn', name: 'CNN' },
                    { id: 'axios', name: 'Axios' }
                ]
            });
        }
    });
}

// 2. Функция для загрузки новостей (по умолчанию все)
function loadNews(sourceId: string = ''): void {
    // Если sourceId пустой, передаем пустую строку (прокси отдаст всё)
    const options = sourceId ? { sources: sourceId } : {};
    
    loader.getResp<NewsApiResponse>({ endpoint: 'mocks/everything', options }, (data: NewsApiResponse) => {
        if (data && data.articles && data.articles.length > 0) {
            console.log('✅ Новости загружены:', data.articles.length);
            view.drawNews(data);
        } else {
            console.warn('⚠️ Новости не загружены.');
        }
    });
}

// 3. Инициализация
function init(): void {
    // Загружаем реальные источники
    loadSources();

    // Загружаем новости по умолчанию
    loadNews();

    // Подписываемся на выбор источника в комбобоксе
    view.onSourceSelect((source: NewsSource) => {
        console.log('Выбран источник:', source.name, source.id);
        if (source.id) {
            loadNews(source.id); // Загружаем новости только для этого источника
        } else {
            loadNews(); // Если id нет, грузим все
        }
    });
}

// Очищаем кэш, чтобы загрузить свежие данные
localStorage.clear();
init();