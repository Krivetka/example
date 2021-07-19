import { BaseComponent } from '../base-component';

export class Button extends BaseComponent {
  constructor(
    buttonClass: Array<string>,
    buttonId: string,
    buttonText: string,
    buttonFun: () => void,
    parent: HTMLElement
  ) {
    super('div', ['button']);
    if (buttonClass.length > 0)
      buttonClass.map((el) => this.element.classList.add(el));
    if (buttonId !== '') this.element.id = buttonId;

    if (buttonText !== '') this.element.innerText = buttonText;
    parent.appendChild(this.element);
    this.element.addEventListener('click', buttonFun);
  }
}
