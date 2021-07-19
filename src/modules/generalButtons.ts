import { BaseComponent } from '../base-component';
import { Button } from './button';
import { deleteCar, deleteWinner, getCar } from '../api';
import {updateStateGarage, updateStateWinners} from '../ui';
import { Render } from './render';

export class GeneralButtons extends BaseComponent {
  private button: Button;
  constructor(id: number, name: string) {
    super('div', ['general-buttons']);
    this.button = new Button(
      ['select-button'],
      `select-car-${id}`,
      'Select',
      () => {
        const id = parseInt(this.button.element.id.split(`select-car-`)[1]);
        getCar(id).then((res) => {
          const updateName = document.getElementById(
            'update-name'
          ) as HTMLInputElement;
          if (updateName) {
            updateName.value = res.name;
            updateName.disabled = false;
          }
          const updateColor = document.getElementById(
            'update-color'
          ) as HTMLInputElement;
          if (updateColor) {
            updateColor.value = res.color;
            updateColor.disabled = false;
          }
          const updateId = document.getElementById(
            'update-submit'
          ) as HTMLElement;
          if (updateId) {
            updateId.classList.add(String(id));
          }
        });
      },
      this.element
    );
    this.button = new Button(
      ['remove-button'],
      `select-car-${id}`,
      'Remove',
      () => {
        const id = Number.parseInt(
          this.button.element.id.split('select-car-')[1]
        );
        deleteCar(id).then(() =>
          deleteWinner(id).then(() =>
            updateStateGarage().then(() =>
              updateStateWinners().then(() => {
                const render = new Render();
                document.body.innerHTML = '';
                document.body.append(render.element);
              })
            )
          )
        );
      },
      this.element
    );
    const span = document.createElement('span');
    span.className = 'car-name';
    span.innerHTML = `${name}`;
    this.element.appendChild(span);
  }
}
