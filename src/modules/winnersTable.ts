import { BaseComponent } from '../base-component';
import { getWinners } from '../api';
import { renderCarImage } from './renderCarImage';
import store from '../store';
import { setSortOrder } from '../ui';

export class WinnersTable extends BaseComponent {
  tbody: HTMLElement;
  constructor() {
    super('table', ['table']);
    const thead = document.createElement('thead');

    this.addTh('Number', thead);
    this.addTh('Car', thead);
    this.addTh('Name', thead);

    this.addThButton('table-wins', 'Wins', 'wins', thead);
    this.addThButton('table-time', 'Best time (seconds)', 'time', thead);
    this.element.appendChild(thead);

    this.tbody = document.createElement('tbody');
    this.getWinners();

    this.element.appendChild(this.tbody);
  }
  addTh(text: string, parent: HTMLElement) {
    const th = document.createElement('th');
    th.innerText = `${text}`;
    parent.appendChild(th);
  }

  addThButton(
    thClass: string,
    text: string,
    sort: string,
    parent: HTMLElement
  ) {
    const th = document.createElement('th');
    th.classList.add(thClass);
    th.classList.add('table-button');
    th.innerText = `${text}`;
    th.addEventListener('click', async () => {
      await setSortOrder(sort);
      this.getWinners();
    });
    parent.appendChild(th);
  }

  async getWinners() {
    const res = await getWinners({
      page: store.winnersPage,
      order: store.sortOrder,
      sort: store.sortBy,
    });
    const showWinners = (res: { count: string | null; items: Array<any> }) => {
      const winners = res.items;
      this.tbody.innerHTML = ` 
      ${winners
        .map(
          (winner: any, index: number) => `
          <tr>
            <td>${store.winnersPage * 10 + index - 9}</td>
            <td>${renderCarImage(winner.car.color)}</td>
            <td>${winner.car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time}</td>
          </tr>
`
        )
        .join('')} `;
    };
    showWinners(res);
    this.element.appendChild(this.tbody);
  }
}
