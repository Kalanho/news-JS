import { ISource } from '../types/types';


export type SourceClickHandler = (sourceId: string) => void;

export class SourceList {
  private readonly container: HTMLElement;

  constructor(containerSelector: string) {
    this.container = document.querySelector(containerSelector) as HTMLElement;
  }

  public render(sources: ISource[], onSourceClick: SourceClickHandler): void {
    this.container.innerHTML = ''; 
    
    const template = document.getElementById('sourceItemTemp') as HTMLTemplateElement;

    
    const allBtn = document.createElement('button');
    allBtn.className = 'source-btn active'; 
    allBtn.textContent = 'All News';
    allBtn.addEventListener('click', () => {
      this.setActiveButton(allBtn);
      onSourceClick(''); 
    });
    this.container.appendChild(allBtn);


    sources.forEach((source: ISource) => {
      const clone = template.content.cloneNode(true) as DocumentFragment;
      const btn = clone.querySelector('.source-btn') as HTMLButtonElement;
      const nameSpan = clone.querySelector('.source-btn__name') as HTMLElement;

      nameSpan.textContent = source.name;

      btn.addEventListener('click', () => {
        this.setActiveButton(btn);
        onSourceClick(source.id);
      });

      this.container.appendChild(clone);
    });
  }

 
  private setActiveButton(activeBtn: HTMLElement): void {
    const buttons = this.container.querySelectorAll('.source-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }
}