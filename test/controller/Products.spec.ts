import { PlatformTest, Req } from '@tsed/common';
import faker from 'faker';
import { Product } from '../../src/controllers/models';
import ProductsController from '../../src/controllers/Products';
import ProductsModel from '../../src/sqlz/models/Product.model';

describe('Products Controller', () => {
    const qtd = faker.random.number({ min: 0, max: 1000 });
    const minQtd = faker.random.number({ min: 0, max: 5 });

    let products: Product[] = [...Array(faker.random.number({ min: 1, max: 50 }))].map((_aux, i) => ({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        qtd,
        minQtd,
        image: i % 2 === 0 ? faker.image.imageUrl() : undefined,
    }));
    let product: Product = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        qtd,
        minQtd,
        image: faker.image.imageUrl(),
    };
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
        const req = {
            params: {
                id: product.id,
            },
        };

        expect(await service.findByPk((req as unknown) as Req)).toEqual(product);
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
        const req = {
            body: {
                id: product.id,
            },
        };

        expect(await service.deleteProduct((req as unknown) as Req)).toEqual({
            ...product,
        });
    });
});
