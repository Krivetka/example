import { BaseComponent } from '../base-component';
import { Menu } from './menu';
import { RenderGarageView } from './renderGarageView';
import { RenderWinners } from './renderWinners';
import { Pagination } from './pagination';
import store from '../store';

export class Render extends BaseComponent {
  constructor() {
    super('div');

    const menu = new Menu();
    this.element.appendChild(menu.element);

    const garageView = new RenderGarageView();
    this.element.appendChild(garageView.element);

    const winnersView = new RenderWinners();
    this.element.appendChild(winnersView.element);

    const divPages = new Pagination();
    this.element.appendChild(divPages.element);

    document.body.appendChild(this.element);

    if (store.view === 'garage') {
      garageView.element.style.display = 'block';
      winnersView.element.style.display = 'none';
    }
    if (store.view === 'winners') {
      garageView.element.style.display = 'none';
      winnersView.element.style.display = 'block';
    }
  }
}
