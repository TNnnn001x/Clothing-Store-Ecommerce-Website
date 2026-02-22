import { CategoryService } from './category.service';
import { category } from './category.entity';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<category[]>;
    findOne(id: string): Promise<category>;
    create(Category: category): Promise<category>;
    update(id: string, Category: category): Promise<category>;
    remove(id: string): Promise<void>;
}
