import { Controller, Get } from '@tsed/common';
import { Description, Returns, Summary } from '@tsed/schema';
import { MeasuresReport, QuantityReport } from './models';
import ProductsModel from '../sqlz/models/Product.model';
import { Authorize } from '@tsed/passport';
import sequelize from 'sequelize';

@Controller('/reports')
export default class ProductsController {
    @Authorize()
    @Get('/measures')
    @Summary('Gets the measure report data')
    @Description('Gets the measures report data')
    @(Returns(200).Description('Measures Report Data'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async findMeasuresReport(): Promise<MeasuresReport> {
        return await ProductsModel.findAll({
            attributes: [
                ['measure', 'measureName'],
                [sequelize.fn('sum', sequelize.col('qtd')), 'measureQuantity'],
            ],
            group: ['measure'],
        });
    }

    @Authorize()
    @Get('/quantity')
    @Summary('Gets the quantity report data')
    @Description('Gets the measures report data')
    @(Returns(200).Description('Quantity Report Data'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async findQuantityReport(): Promise<QuantityReport> {
        return await ProductsModel.findAll({
            attributes: [
                ['name', 'productName'],
                ['qtd', 'productQuantity'],
            ],
        });
    }
}
