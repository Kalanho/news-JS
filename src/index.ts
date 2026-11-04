import './global.css';
import { NewsApi } from './api/NewsApi';
import { NewsCard } from './components/NewsCard';
import { SourceList } from './components/SourceList'; 
import { IArticle, ISource } from './types/types';

const api = new NewsApi();
const cardRenderer = new NewsCard();
const sourceList = new SourceList('.sources-buttons'); 
const newsContainer = document.querySelector('.news-grid') as HTMLElement;


let allArticles: IArticle[] = [];


function renderNews(articles: IArticle[]): void {
  newsContainer.innerHTML = '';
  if (articles.length === 0) {
    newsContainer.innerHTML = '<p style="color: white;">Новостей не найдено.</p>';
    return;
  }
  articles.forEach((article: IArticle) => {
    const card = cardRenderer.render(article);
    newsContainer.appendChild(card);
  });
}


function filterNewsBySource(sourceId: string): void {
  if (!sourceId) {
    renderNews(allArticles); 
    return;
  }
  

  const filtered = allArticles.filter(article => {
   
      return article.source && article.source.name === sourceId;
  });
  
  renderNews(filtered);
}


async function loadData(): Promise<void> {
  try {

    const [articles, sources] = await Promise.all([
      api.getTopHeadlines(),
      api.getSources()
    ]);

    allArticles = articles; 

    
    renderNews(allArticles);

    
    sourceList.render(sources, (sourceId: string) => {
     
        filterNewsBySource(sourceId);
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to load data:', error.message);
    }
  }
}


loadData();