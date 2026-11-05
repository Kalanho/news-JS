import '../css/sources.css';
import { NewsSource } from '../types/types';

class Sources {
    private input: HTMLInputElement | null;
    private toggleBtn: HTMLButtonElement | null;
    private list: HTMLUListElement | null;

    private allData: NewsSource[] = [];
    private filtered: NewsSource[] = [];
    private activeIndex = -1;
    private selectedId: string | null = null;
    private isOpen = false;

    public onSelect: ((source: NewsSource) => void) | null = null;

    constructor() {
        this.input = document.querySelector('.sources-combobox__input');
        this.toggleBtn = document.querySelector('.sources-combobox__toggle');
        this.list = document.querySelector('.sources-combobox__list');

        if (!this.input || !this.list) {
            console.warn('Combobox elements not found');
            return;
        }

        this.bindEvents();
    }

    public draw(data: NewsSource[]): void {
        this.allData = data;
        this.filtered = [...data];

        if (data.length > 0) {
            this.selectedId = data[0].id;
            this.input!.value = data[0].name;
            this.onSelect?.(data[0]);
        } else {
            this.selectedId = null;
            this.input!.value = '';
        }

        this.renderList();
    }

    private bindEvents(): void {
        this.input!.addEventListener('focus', () => this.open());
        this.input!.addEventListener('click', () => this.open());
        this.input!.addEventListener('input', () => {
            this.filter(this.input!.value);
            this.open();
        });

        this.input!.addEventListener('keydown', (e) => this.onKeyDown(e));

        this.toggleBtn?.addEventListener('click', () => {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        });

        document.addEventListener('click', (e) => {
            const target = e.target as Node;
            if (!this.input!.parentElement?.contains(target)) {
                this.close();
            }
        });

        this.list!.addEventListener('click', (e) => {
            const li = (e.target as HTMLElement).closest<HTMLLIElement>('.sources-combobox__option');
            if (!li) return;
            const id = li.dataset.sourceId;

            const item = this.allData.find((s) => String(s.id) === id);
            if (item) {
                this.select(item);
            }
        });
    }

    private filter(query: string): void {
        const q = query.trim().toLowerCase();
        this.filtered = q ? this.allData.filter((s) => s.name.toLowerCase().includes(q)) : [...this.allData];
        this.activeIndex = this.filtered.length > 0 ? 0 : -1;
        this.renderList();
    }

    private renderList(): void {
        if (!this.list) return;
        this.list.innerHTML = '';

        if (this.filtered.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'sources-combobox__empty';
            empty.textContent = 'Ничего не найдено';
            this.list.append(empty);
            return;
        }

        const fragment = document.createDocumentFragment();
        this.filtered.forEach((item, idx) => {
            const li = document.createElement('li');
            li.className = 'sources-combobox__option';
            if (idx === this.activeIndex) li.classList.add('is-active');

            if (item.id) {
                li.dataset.sourceId = item.id;
            }

            li.setAttribute('role', 'option');
            li.setAttribute('aria-selected', String(item.id === this.selectedId));
            li.textContent = item.name;
            fragment.append(li);
        });
        this.list.append(fragment);
    }

    private open(): void {
        if (!this.list || !this.input) return;
        if (this.isOpen) return;
        this.isOpen = true;
        this.list.hidden = false;
        this.input.setAttribute('aria-expanded', 'true');
        this.renderList();
    }

    private close(): void {
        if (!this.list || !this.input) return;
        this.isOpen = false;
        this.list.hidden = true;
        this.input.setAttribute('aria-expanded', 'false');
        this.activeIndex = -1;
    }

    private select(item: NewsSource): void {
        this.selectedId = item.id;
        this.input!.value = item.name;
        this.close();
        this.renderList();
        this.onSelect?.(item);
    }

    private onKeyDown(e: KeyboardEvent): void {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!this.isOpen) this.open();
            this.activeIndex = Math.min(this.activeIndex + 1, this.filtered.length - 1);
            this.renderList();
            this.scrollActiveIntoView();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
            this.renderList();
            this.scrollActiveIntoView();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const item = this.filtered[this.activeIndex];
            if (item) this.select(item);
        } else if (e.key === 'Escape') {
            this.close();
        }
    }

    private scrollActiveIntoView(): void {
        this.list?.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
    }
}

export default Sources;