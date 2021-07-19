import { BaseComponent } from '../base-component';
import { Form } from './form';

export class FormsBlock extends BaseComponent {
  constructor() {
    super('div');
    const formCreate = new Form(
      'create',
      'create-name',
      'create-color',
      '',
      false,
      'Create',
      this.element
    );
    const formUpdate = new Form(
      'update',
      'update-name',
      'update-color',
      'update-submit',
      true,
      'Update',
      this.element
    );
  }
}
