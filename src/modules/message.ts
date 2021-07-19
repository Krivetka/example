import { BaseComponent } from '../base-component';

export class Message extends BaseComponent {
  constructor() {
    super('div', ['message']);
    this.element.id = 'message';
  }
}
