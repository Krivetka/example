import { BaseComponent } from '../base-component';
import { Button } from './button';
import { generateRandomCars, race } from '../utils';
import { createCar, getCars, saveWinner } from '../api';
import {
  startDriving,
  stopDriving,
  updateStateGarage,
  updateStateWinners,
} from '../ui';
import { Render } from './render';
import store from '../store';
import { RenderWinners } from './renderWinners';

const SHOW_MASSAGE_TIME = 5000;

export class RaceControls extends BaseComponent {
  constructor() {
    super('div', ['race-controls']);
    new Button(
      ['race-button', 'primary'],
      'race',
      'Race',
      () => {
        if (!store.race) {
          race(startDriving).then((res) => {
            saveWinner(res).then(() => {
              const massage = document.getElementById('massage');
              if (massage) {
                massage.innerHTML = `${res.carWin.name} went first ${res.time}s !`;
                setTimeout(() => {
                  massage.innerHTML = '';
                }, SHOW_MASSAGE_TIME);
              }
              const winners = document.getElementById('winners-view');
              if (winners) {
                updateStateWinners().then(() => {
                  winners.innerHTML = '';
                  const renderWinners = new RenderWinners();
                  winners.append(renderWinners.element);
                });
              }
            });
          });
          store.race = true;
        }
      },
      this.element
    );
    new Button(
      ['reset-button', 'primary'],
      'reset',
      'Reset',
      () => {
        if (store.race) {
          getCars(store.carsPage).then((res) => {
            res.items.map(({ id }: { id: number }) => stopDriving(id));
          });
          store.race = false;
        }
      },
      this.element
    );
    new Button(
      ['generator-button'],
      'generator',
      'Generate cars',
      () => {
        const cars = generateRandomCars();

        Promise.all(cars.map((c) => createCar(c))).then(() =>
          updateStateGarage().then(() => {
            const render = new Render();
            document.body.innerHTML = '';
            document.body.append(render.element);
          })
        );
      },
      this.element
    );
  }
}
