import { Controller, Delete, Get, Post, Put, Request } from '@tsed/common';
import { Authorize } from '@tsed/passport';
import { Description, Returns, Summary } from '@tsed/schema';
import { Product } from './models';
import ProductsModel from '../sqlz/models/Product.model';

@Controller('/product')
export default class ProductsController {
    @Authorize()
    @Get('s')
    @Summary('Gets all products')
    @Description('Returns all the products')
    @(Returns(200).Description('Products'))
    @(Returns(404).Description('Not found'))
    async findAll(): Promise<Product[]> {
        return (await ProductsModel.findAll()).map((product: Product) => product);
    }

    @Authorize()
    @Get('/:id')
    @Summary('Gets one product')
    @Description('Returns one product by id via GET params')
    @(Returns(200).Description('One Product'))
    @(Returns(404).Description('Not found'))
    async findByPk(req: Request): Promise<Product> {
        return await ProductsModel.findByPk(req.params.id);
    }

    @Authorize()
    @Post()
    @Summary('Add one product')
    @Description('Saves and returns one product with the id property setted')
    @(Returns(200).Description('One Product'))
    @(Returns(404).Description('Not found'))
    async newProduct(req: Request): Promise<Product> {
        const { product } = req.body;
        return await ProductsModel.create(product);
    }

    @Authorize()
    @Put()
    @Summary('Update one product')
    @Description('Saves and returns the product updating old properties')
    @(Returns(200).Description('One Product'))
    @(Returns(404).Description('Not found'))
    async updateProduct(req: Request): Promise<Product> {
        const { product } = req.body;
        return await ProductsModel.update(product, {
            where: {
                id: product.id,
            },
        });
    }

    @Authorize()
    @Delete()
    @Summary('Deletes one product')
    @Description('Delete the product from the database')
    @(Returns(200).Description('One Product'))
    @(Returns(404).Description('Not found'))
    async deleteProduct(req: Request): Promise<Product> {
        return await ProductsModel.destroy({ where: { id: req.body.id } });
    }
}
