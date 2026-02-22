import { BrandService } from './brand.service';
import { brand } from './brand.entity';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    findAll(): Promise<brand[]>;
    findOne(id: string): Promise<brand>;
    create(Brand: brand): Promise<brand>;
    update(id: string, Brand: brand): Promise<brand>;
    remove(id: string): Promise<void>;
}
