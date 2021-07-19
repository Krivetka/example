import { BaseComponent } from '../base-component';
import { FormsBlock } from './formsBlock';
import { RaceControls } from './raceControls';
import { RenderGarage } from './renderGarage';
import { Message } from './message';

export class RenderGarageView extends BaseComponent {
  constructor() {
    super('div');
    this.element.id = 'garage-view';

    const divForms = new FormsBlock();
    this.element.appendChild(divForms.element);

    const divControls = new RaceControls();
    this.element.appendChild(divControls.element);

    const garage = new RenderGarage();
    this.element.appendChild(garage.element);

    const divMassage = new Message();
    this.element.appendChild(divMassage.element);
  }
}
