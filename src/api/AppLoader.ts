import Loader from './Loader';

class AppLoader extends Loader {
    constructor() {
     
        super('https://rss-news-api.onrender.com/', {});
    }
}

export default AppLoader;