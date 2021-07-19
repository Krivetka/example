import { BaseComponent } from '../base-component';
import { Button } from './button';
import store from '../store';

export class Menu extends BaseComponent {
  constructor() {
    super('div', ['menu']);
    new Button(
      ['garage-menu-button', 'primary'],
      'garage-menu',
      'To garage',
      () => {
        const garage = document.getElementById('garage-view');
        const winners = document.getElementById('winners-view');
        if (garage && winners) {
          garage.style.display = 'block';
          winners.style.display = 'none';
          store.view = 'garage';
        }
      },
      this.element
    );
    new Button(
      ['winners-menu-button', 'primary'],
      'winners-menu',
      'To winners',
      () => {
        const garage = document.getElementById('garage-view');
        const winners = document.getElementById('winners-view');
        if (garage && winners) {
          winners.style.display = 'block';
          garage.style.display = 'none';
          store.view = 'winners';
        }
      },
      this.element
    );
  }
}
