import { PlatformTest, Req } from '@tsed/common';
import ProductsController from '../../src/controllers/Products';
import ProductsModel from '../../src/sqlz/models/Product.model';
import { getFakeProduct, getFakeProductArray } from '../util/ProductFactory';

describe('Products Controller', () => {
    let products = getFakeProductArray();
    let product = getFakeProduct();
    let service: ProductsController;

    beforeEach(async () => {
        PlatformTest.create();
        service = await PlatformTest.invoke<ProductsController>(ProductsController);
    });
    afterEach(PlatformTest.reset);

    it('GET /products - should get all users from db.', async () => {
        jest.spyOn(ProductsModel, 'findAll').mockReturnValue(products);
        expect(await service.findAll()).toEqual(products);
    });

    it('GET /product/:id - should return a product by id.', async () => {
        jest.spyOn(ProductsModel, 'findByPk').mockReturnValue(product);
        expect(await service.findByPk(product.id)).toEqual(product);
    });

    it('POST /product - should add a product by id.', async () => {
        jest.spyOn(ProductsModel, 'create').mockReturnValue(product);
        const req = {
            body: {
                product,
                id: undefined,
            },
        };

        expect(await service.newProduct((req as unknown) as Req)).toEqual({
            ...product,
        });
    });

    it('PUT /product - should update the product by id.', async () => {
        jest.spyOn(ProductsModel, 'update').mockReturnValue(product);
        const req = {
            body: {
                product,
            },
        };

        expect(await service.updateProduct((req as unknown) as Req)).toEqual({
            ...product,
        });
    });

    it('DELETE /product - should delete a product by id.', async () => {
        jest.spyOn(ProductsModel, 'destroy').mockReturnValue(product);
        expect(await service.deleteProduct(product.id)).toEqual({
            ...product,
        });
    });
});
