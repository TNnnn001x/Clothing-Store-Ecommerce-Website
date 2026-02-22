import { FiltercategoryService } from './filtercategory.service';
import { filtercategory } from './filtercategory.entity';
export declare class FiltercategoryController {
    private readonly filtercategoryService;
    constructor(filtercategoryService: FiltercategoryService);
    findAll(): Promise<filtercategory[]>;
    findOne(id: string): Promise<filtercategory>;
    create(Filtercategory: filtercategory): Promise<filtercategory>;
    update(id: string, Filtercategory: filtercategory): Promise<filtercategory>;
    remove(id: string): Promise<void>;
}
