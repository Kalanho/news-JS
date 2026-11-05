export interface LoaderOptions {
    [key: string]: string | undefined;
}

export interface RequestParams {
    endpoint: string;
    options?: LoaderOptions;
}

export type Callback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: LoaderOptions;
    private readonly CACHE_TTL = 15 * 60 * 1000; // 15 минут

    constructor(baseLink: string, options: LoaderOptions = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        
        // Если endpoint передан, добавляем его к базовому URL, а не в параметры
        let url = this.baseLink;
        if (endpoint) {
            url += endpoint; 
        }

        // Если есть остальные параметры, добавляем их через ?
        const keys = Object.keys(urlOptions);
        if (keys.length > 0) {
            const separator = url.includes('?') ? '&' : '?';
            url += separator;
            keys.forEach((key) => {
                url += `${key}=${urlOptions[key]}&`;
            });
            url = url.slice(0, -1); // Убираем лишний &
        }

        return url;
    }
    private load<T>(method: string, endpoint: string, callback: Callback<T>, options: LoaderOptions = {}): void {
        const url = this.makeUrl(options, endpoint);
        const cacheKey = `news_cache_${url}`;
        const cachedString = localStorage.getItem(cacheKey);

        if (cachedString) {
            try {
                const { timestamp, data } = JSON.parse(cachedString);
                const now = new Date().getTime();

                if (now - timestamp < this.CACHE_TTL) {
                    console.log(`[Cache] Данные для ${endpoint} взяты из localStorage`);
                    callback(data as T);
                    return;
                } else {
                    localStorage.removeItem(cacheKey);
                }
            } catch {
                localStorage.removeItem(cacheKey);
            }
        }

        console.log(`[Network] Запрос к API для ${endpoint}`);
        fetch(url, { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => {
                const cacheData = {
                    timestamp: new Date().getTime(),
                    data: data,
                };
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                } catch {
                    console.warn('Не удалось сохранить данные в localStorage');
                }
                callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;