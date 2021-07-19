import { BaseComponent } from '../base-component';
import { GeneralButtons } from './generalButtons';
import { Road } from './road';

export class RenderCar extends BaseComponent {
  constructor(car: {
    id: number;
    name: string;
    color: string;
    isEngineStarted: boolean;
  }) {
    super('li');

    const general = new GeneralButtons(car.id, car.name);
    this.element.appendChild(general.element);

    const road = new Road(car.id, car.color);
    this.element.appendChild(road.element);

    const flag = document.createElement('div');
    flag.className = 'flag';
    flag.id = `flag-${car.id}`;
    flag.textContent = `🏁`;
    this.element.appendChild(flag);
  }
}
