import { ProductService } from './product.service';
import { product } from './product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<product[]>;
    findOne(id: string): Promise<product>;
    create(Product: product): Promise<product>;
    update(id: string, Product: product): Promise<product>;
    remove(id: string): Promise<void>;
}
