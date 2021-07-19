import store from './store';

export const animation = (
  car: HTMLElement,
  distance: number,
  animationTime: number
) => {
  let start: number;
  const state = {
    id: 0,
  };

  const step = (timestamp: number)=> {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);

  return state;
}

// @ts-ignore
export const raceAll = async (
  promises:
    | string
    | any[]
    | readonly { success: boolean; id: number; time: number }[],
  ids: number[]
) => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    const restPromises = [
      ...promises.slice(0, failedIndex),
      ...promises.slice(failedIndex + 1, promises.length),
    ];
    const restIds = [
      ...ids.slice(0, failedIndex),
      ...ids.slice(failedIndex + 1, ids.length),
    ];

    return raceAll(restPromises, restIds);
  }

  return {
    carWin: store.cars.find((car: { id: number }) => car.id === id),
    time: +(time / 1000).toFixed(2),
  };
};

export const race = async (action: {
  (id: number): Promise<
    { success: boolean; id: number; time: number } | undefined
  >;
  (arg0: number): object;
}) => {
  const promises = store.cars.map(({ id }: { id: number }) => action(id));
  return await raceAll(
    promises,
    store.cars.map((car: { id: number }) => car.id)
  );
};

const models = [
  '3 Series',
  'Model T ',
  'Model S',
  'Civic ',
  'Corolla',
  'Golf',
  'Model D',
  'Model Z',
  'Zuc',
  'Cat',
  'Mini',
];
const names = [
  'BMW',
  'Ford',
  'Honda',
  'Opel',
  'Toyota',
  'Volkswagen',
  'Ferrari',
  'Mazda',
  'Skoda',
  'Volvo',
  'Lexus',
];

const getRandomName = () => {
  const name = names[Math.floor(Math.random() * names.length)];
  const model = models[Math.floor(Math.random() * models.length)];

  return `${name} ${model}`;
};

const getRandomColor = () => {
  const LETTERS = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += LETTERS[Math.floor(Math.random() * LETTERS.length)];
  }
  return color;
};

export const generateRandomCars = (count = 100) =>
  new Array(count).fill(1).map((_) => ({
    name: getRandomName(),
    color: getRandomColor(),
  }));
