import faker from 'faker';
import { MeasuresReport, MeasuresReportItem, QuantityReport, QuantityReportItem } from '../../src/controllers/models';
import { getRandomMeasure, getRandomPositiveNumber } from './ProductFactory';

export const getFakeQuantityReportItem = (): QuantityReportItem => ({
    productName: faker.commerce.productName(),
    productQuantity: getRandomPositiveNumber(50),
});

export const getFakeMeasuresReportItem = (): MeasuresReportItem => ({
    measureName: getRandomMeasure(),
    measureQuantity: getRandomPositiveNumber(50),
});

export const getFakeQuantityReport = (): QuantityReport =>
    Array(getRandomPositiveNumber(50)).map(getFakeQuantityReportItem);

export const getFakeMeasuresReport = (): MeasuresReport =>
    Array(getRandomPositiveNumber(50)).map(getFakeMeasuresReportItem);
