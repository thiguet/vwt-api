import { PlatformTest } from '@tsed/common';
import ReportsController from '../../src/controllers/Reports';
import ProductModel from '../../src/sqlz/models/Product.model';
import {
    getFakeMeasuresReport,
    getFakeMeasuresReportItem,
    getFakeQuantityReport,
    getFakeQuantityReportItem,
} from '../util/ReportsFactory';
import sequelize from 'sequelize';

describe('Reports Controller', () => {
    let service: ReportsController;

    beforeEach(async () => {
        PlatformTest.create();
        service = await PlatformTest.invoke<ReportsController>(ReportsController);
    });
    afterEach(PlatformTest.reset);

    it('GET /reports/measures - gets the measures report (one item)', async () => {
        const MR = [getFakeMeasuresReportItem()];
        jest.spyOn(ProductModel, 'findAll').mockResolvedValue(MR);
        expect(await service.findMeasuresReport()).toEqual(MR);
        expect(ProductModel.findAll).toBeCalledWith({
            attributes: [
                ['measure', 'measureName'],
                [sequelize.fn('sum', sequelize.col('qtd')), 'measureQuantity'],
            ],
            group: ['measure'],
        });
    });

    it('GET /reports/measures - gets the measures report', async () => {
        const MR = getFakeMeasuresReport();
        jest.spyOn(ProductModel, 'findAll').mockResolvedValue(MR);
        expect(await service.findMeasuresReport()).toEqual(MR);
        expect(ProductModel.findAll).toBeCalledWith({
            attributes: [
                ['measure', 'measureName'],
                [sequelize.fn('sum', sequelize.col('qtd')), 'measureQuantity'],
            ],
            group: ['measure'],
        });
    });

    it('GET /reports/quantity - gets the quantity report (one item).', async () => {
        const QR = [getFakeQuantityReportItem()];
        jest.spyOn(ProductModel, 'findAll').mockResolvedValue(QR);
        expect(await service.findQuantityReport()).toEqual(QR);
        expect(ProductModel.findAll).toBeCalledWith({
            attributes: [
                ['name', 'productName'],
                ['qtd', 'productQuantity'],
            ],
        });
    });

    it('GET /reports/quantity - gets the quantity report.', async () => {
        const QR = getFakeQuantityReport();
        jest.spyOn(ProductModel, 'findAll').mockResolvedValue(QR);
        expect(await service.findQuantityReport()).toEqual(QR);
        expect(ProductModel.findAll).toBeCalledWith({
            attributes: [
                ['name', 'productName'],
                ['qtd', 'productQuantity'],
            ],
        });
    });
});
