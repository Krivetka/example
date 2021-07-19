import store from '../store';
import { BaseComponent } from '../base-component';
import { RenderCar } from './renderCar';

export class RenderGarage extends BaseComponent {
  private readonly garageTitle: HTMLElement;
  private readonly page: HTMLElement;
  private readonly garage: HTMLElement;
  constructor() {
    super('div', ['garage']);
    this.garageTitle = document.createElement('h1');
    this.garageTitle.innerHTML = `Garage (${store.carsCount})`;
    this.element.appendChild(this.garageTitle);

    this.page = document.createElement('h2');
    this.page.innerHTML = `Page #${store.carsPage}`;
    this.element.appendChild(this.page);

    this.garage = document.createElement('ul');
    this.garage.classList.add('garage');
    this.getCars();
    this.element.appendChild(this.garage);
  }

  getCars() {
    store.cars.map(
      (car: {
        id: number;
        name: string;
        color: string;
        isEngineStarted: boolean;
      }) => {
        const carModel = new RenderCar(car);
        this.garage.appendChild(carModel.element);
      }
    );
  }
}
