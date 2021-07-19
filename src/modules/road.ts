import { BaseComponent } from '../base-component';
import { renderCarImage } from './renderCarImage';
import { startDriving, stopDriving } from '../ui';

export class Road extends BaseComponent {
  constructor(id: number, color: string) {
    super('div', ['road']);
    const launchPad = this.addDiv('launch-pad', this.element);
    const controlPanel = this.addDiv('control-panel', launchPad);
    const buttonA = this.addButton(
      'start-engine-button',
      `start-engine-car-${id}`,
      'A',
      false,
      () => {
        startDriving(id);
        buttonA.disabled = true;
        buttonB.disabled = false;
      },
      controlPanel
    );
    const buttonB = this.addButton(
      'stop-engine-button',
      `stop-engine-car-${id}`,
      'B',
      true,
      () => {
        stopDriving(id);
        buttonB.disabled = true;
        buttonA.disabled = false;
      },
      controlPanel
    );
    const blockCar = this.addDiv('car', launchPad);
    blockCar.id = `car-${id}`;
    blockCar.innerHTML += renderCarImage(color);
  }

  addButton(
    buttonClassList: string,
    buttonId: string,
    buttonText: string,
    buttonDisabled: boolean,
    buttonFun: () => void,
    parent: HTMLElement
  ) {
    const button = document.createElement('button');
    button.disabled = buttonDisabled;
    button.className = 'icon';
    button.classList.add(buttonClassList);
    button.id = buttonId;
    button.textContent = buttonText;
    button.addEventListener('click', buttonFun);
    parent.appendChild(button);
    return button;
  }
  addDiv(divId: string, parent: HTMLElement) {
    let div = document.createElement('div');
    if (divId !== '') div.id = divId;
    parent.appendChild(div);
    return div;
  }
}
