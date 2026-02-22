import { Repository } from 'typeorm';
import { filtercategory } from './filtercategory.entity';
export declare class FiltercategoryService {
    private filtercategoryRepository;
    constructor(filtercategoryRepository: Repository<filtercategory>);
    findall(): Promise<filtercategory[]>;
    findOne(FilterCateID: number): Promise<filtercategory>;
    create(Filtercategory: filtercategory): Promise<filtercategory>;
    update(FilterCateID: number, Filtercategory: Partial<filtercategory>): Promise<filtercategory>;
    remove(FilterCateID: number): Promise<void>;
}
