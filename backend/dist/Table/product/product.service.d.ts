import { Repository } from 'typeorm';
import { product } from './product.entity';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<product>);
    findall(): Promise<product[]>;
    findOne(ProdID: number): Promise<product>;
    create(Product: product): Promise<product>;
    update(ProdID: number, Product: Partial<product>): Promise<product>;
    remove(ProdID: number): Promise<void>;
}
