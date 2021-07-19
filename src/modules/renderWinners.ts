import { BaseComponent } from '../base-component';
import store from '../store';
import { WinnersTable } from './winnersTable';

export class RenderWinners extends BaseComponent {
  private readonly winnersTitle: HTMLElement;
  private readonly page: HTMLElement;
  constructor() {
    super('div');
    this.element.id = 'winners-view';
    this.winnersTitle = document.createElement('h1');
    this.winnersTitle.innerHTML = `Winners (${store.winnersCount})`;
    this.element.appendChild(this.winnersTitle);

    this.page = document.createElement('h2');
    this.page.innerHTML = `Page #${store.winnersPage}`;
    this.element.appendChild(this.page);

    const table = new WinnersTable();
    this.element.appendChild(table.element);
  }
}
