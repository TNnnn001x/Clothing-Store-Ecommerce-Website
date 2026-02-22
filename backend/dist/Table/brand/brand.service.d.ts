import { Repository } from 'typeorm';
import { brand } from './brand.entity';
export declare class BrandService {
    private brandRepository;
    constructor(brandRepository: Repository<brand>);
    findall(): Promise<brand[]>;
    findOne(BrandID: number): Promise<brand>;
    create(Brand: brand): Promise<brand>;
    update(BrandID: number, Brand: Partial<brand>): Promise<brand>;
    remove(BrandID: number): Promise<void>;
}
