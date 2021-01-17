import faker from 'faker';
import { Measures, Product } from '../../src/controllers/models';

export const getRandomPositiveNumber = (max: number, min: number = 0) => faker.random.number({ min, max });

export const getRandomQtd = () => getRandomPositiveNumber(1000);

export const getRandomMinQtd = () => getRandomPositiveNumber(5);

export const getRandomMeasure = () => faker.random.arrayElement(Object.values(Measures)) as Measures;

export const getFakeProduct = (): Product => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    qtd: getRandomQtd(),
    minQtd: getRandomMinQtd(),
    measure: getRandomMeasure(),
    image: faker.image.imageUrl(),
});

export const getFakeProductArray = (): Array<Product> => Array(getRandomPositiveNumber(50, 1)).map(getFakeProduct);
