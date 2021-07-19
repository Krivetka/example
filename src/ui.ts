import { getCars, startEngine, stopEngine, getWinners, drive } from './api';
import store from './store';
import { animation } from './utils';
const DISTANCE_BETWEEN_FLAG_AND_SCREEN = 200;

export const updateStateGarage = async () => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  if (count) {
    store.carsCount = parseInt(count);
  }
};


export const updateStateWinners = async () => {
  const { items, count } = await getWinners({
    page: store.winnersPage,
    sort: store.sortBy,
    order: store.sortOrder,
  });

  if (count) {
    // @ts-ignore
    store.winners = items;
    store.winnersCount = parseInt(count);
  }
};

export const startDriving = async (id: number) => {
  const startButton = document.getElementById(`start-engine-car-${id}`);
  if (startButton) {
    startButton.classList.toggle('enabling', true);

    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);

    startButton.classList.toggle('enabling', false);

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const htmlDistance = Math.floor(
      window.innerWidth - DISTANCE_BETWEEN_FLAG_AND_SCREEN
    );

    // @ts-ignore
    store.animation[id] = animation(car, htmlDistance, time);

    const { success } = await drive(id);
    if (!success) {
      // @ts-ignore
      window.cancelAnimationFrame(store.animation[id].id);
    }

    return { success, id, time };
  }
};

export const stopDriving = async (id: number) => {
  const stopButton = document.getElementById(`stop-engine-car-${id}`);
  if (stopButton) {
    stopButton.classList.toggle('enabling', true);
    await stopEngine(id);
    stopButton.classList.toggle('enabling', false);

    const car = document.getElementById(`car-${id}`);
    if (car) {
      car.style.transform = `translateX(0)`;
      // @ts-ignore
      if (store.animation[id])
        // @ts-ignore
        window.cancelAnimationFrame(store.animation[id].id);
    }
  }
};

export const setSortOrder = async (sortBy: string) => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  store.sortBy = sortBy;

  await updateStateWinners();
};
