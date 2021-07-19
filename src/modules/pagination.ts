import { BaseComponent } from '../base-component';
import { Button } from './button';
import store from '../store';
import { updateStateGarage, updateStateWinners } from '../ui';
import { Render } from './render';
import { getCars, getWinners } from '../api';
import { WinnersTable } from './winnersTable';

export class Pagination extends BaseComponent {
  constructor() {
    super('div', ['pagination']);
    new Button(
      ['primary', 'prev-button'],
      'prev',
      'Prev',
      () => {
        if (store.view === 'garage') {
          store.race = false;
          if (1 < store.carsPage) {
            store.carsPage--;
            updateStateGarage().then(() => {
              const render = new Render();
              document.body.innerHTML = '';
              document.body.append(render.element);
            });
          }
        }
        if (store.view === 'winners') {
          if (1 < store.winnersPage) {
            store.winnersPage--;
            updateStateWinners().then(() => {
              const winnersView = document.getElementById('winners-view');
              const winnersTable = new WinnersTable();
              winnersTable.getWinners();
              if (winnersView) {
                winnersView.innerHTML = '';
                winnersView.appendChild(winnersTable.element);
              }
            });
          }
        }
      },
      this.element
    );
    new Button(
      ['primary', 'next-button'],
      'next',
      'Next',
      () => {
        if (store.view === 'garage') {
          store.race = false;
          getCars(store.carsPage).then(() => {
            if (store.carsCount / 7 > store.carsPage) {
              store.carsPage++;
              updateStateGarage().then(() => {
                const render = new Render();
                document.body.innerHTML = '';
                document.body.append(render.element);
              });
            }
          });
        }
        if (store.view === 'winners') {
          getWinners({
            page: store.winnersPage,
            sort: store.sortBy,
            order: store.sortOrder,
          }).then(() => {
            if (store.winnersCount / 10 > store.winnersPage) {
              store.winnersPage++;
              updateStateWinners().then(() => {
                const winnersView = document.getElementById('winners-view');
                const winnersTable = new WinnersTable();
                winnersTable.getWinners();
                if (winnersView) {
                  winnersView.innerHTML = '';
                  winnersView.appendChild(winnersTable.element);
                }
              });
            }
          });
        }
      },
      this.element
    );
  }
}
