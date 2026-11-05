import News from './News';
import Sources from './Sources';
import { NewsApiResponse, SourcesApiResponse, NewsSource } from '../types/types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsApiResponse): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: SourcesApiResponse): void {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }

    public onSourceSelect(callback: (source: NewsSource) => void): void {
        this.sources.onSelect = callback;
    }
}

export default AppView;