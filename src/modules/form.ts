import { BaseComponent } from '../base-component';
import { Button } from './button';
import { createCar, updateCar } from '../api';
import { updateStateGarage } from '../ui';
import { Render } from './render';

const create = async (
  createName: HTMLInputElement,
  createColor: HTMLInputElement
) => {
  await createCar({
    name: createName.value,
    color: createColor.value,
  });
  await updateStateGarage();
  const render = new Render();
  document.body.innerHTML = '';
  document.body.append(render.element);
};

const update = async (
  updateName: HTMLInputElement,
  updateColor: HTMLInputElement,
  id: number
) => {
  await updateCar(id, {
    name: updateName.value,
    color: updateColor.value,
  });
  await updateStateGarage();
  const render = new Render();
  document.body.innerHTML = '';
  document.body.append(render.element);
};

export class Form extends BaseComponent {
  private button: Button;
  constructor(
    formId: string,
    firstInputId: string,
    secondInputId: string,
    buttonId: string,
    disabled: boolean,
    buttonTex: string,
    parent: HTMLElement
  ) {
    super('form', ['form']);
    this.element.id = formId;
    let styleDisabled = '';
    if (disabled) {
      styleDisabled = 'disabled="disabled"';
    }
    this.element.innerHTML = `
          <input class="input" id=${firstInputId} name="name" type="text" ${styleDisabled}>
          <input class="color" id=${secondInputId} type="color" value="#ffffff" ${styleDisabled}>
    `;
    this.button = new Button(
      [],
      buttonId,
      buttonTex,
      () => {
        if (buttonTex === 'Create') {
          const createName = document.getElementById(
            'create-name'
          ) as HTMLInputElement;
          const createColor = document.getElementById(
            'create-color'
          ) as HTMLInputElement;
          if (createName.value && createColor.value) {
            create(createName, createColor);
          }
        }
        if (buttonTex === 'Update') {
          const updateName = document.getElementById(
            'update-name'
          ) as HTMLInputElement;
          const updateColor = document.getElementById(
            'update-color'
          ) as HTMLInputElement;
          if (
            updateName.value &&
            updateColor.value &&
            updateName.disabled !== disabled
          ) {
            update(
              updateName,
              updateColor,
              parseInt(this.button.element.classList[1])
            );
          }
        }
      },
      this.element
    );
    parent.appendChild(this.element);
  }
}
