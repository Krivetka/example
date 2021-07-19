import './index.css';
import { Render } from './modules/render';
import { updateStateGarage, updateStateWinners } from './ui';

const render = async ()=> {
  await updateStateGarage();
  await updateStateWinners();
  new Render();
};

render();
