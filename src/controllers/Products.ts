import { Controller, Delete, Get, PathParams, Post, Put, Request } from '@tsed/common';
import { Description, Returns, Summary } from '@tsed/schema';
import { Product } from './models';
import ProductsModel from '../sqlz/models/Product.model';
import { Authorize } from '@tsed/passport';

@Controller('/products')
export default class ProductsController {
    @Authorize()
    @Get('/')
    @Summary('Gets all products')
    @Description('Returns all the products')
    @(Returns(200).Description('Products'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async findAll(): Promise<Product[]> {
        return await ProductsModel.findAll();
    }

    @Authorize()
    @Get('/:id')
    @Summary('Gets one product')
    @Description('Returns one product by id via GET params')
    @(Returns(200).Description('One Product'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async findByPk(@PathParams('id') id: string): Promise<Product> {
        return await ProductsModel.findByPk(id);
    }

    @Authorize()
    @Post()
    @Summary('Add one product')
    @Description('Saves and returns one product with the id property setted')
    @(Returns(200).Description('One Product'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async newProduct(req: Request): Promise<Product> {
        return await ProductsModel.create(req.body.product);
    }

    @Authorize()
    @Put('/:id')
    @Summary('Update one product')
    @Description('Saves and returns the product updating old properties')
    @(Returns(200).Description('One Product'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async updateProduct(req: Request): Promise<Product> {
        const { product } = req.body;
        return await ProductsModel.update(req.body.product, {
            where: {
                id: product.id,
            },
        });
    }

    @Authorize()
    @Delete('/:id')
    @Summary('Deletes one product')
    @Description('Delete the product from the database')
    @(Returns(200).Description('One Product'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async deleteProduct(@PathParams('id') id: string): Promise<Product> {
        const product = await ProductsModel.findByPk(id);
        await ProductsModel.destroy({ where: { id } });
        return product;
    }
}
