import { Repository } from 'typeorm';
import { category } from './category.entity';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<category>);
    findall(): Promise<category[]>;
    findOne(CateID: number): Promise<category>;
    create(Category: category): Promise<category>;
    update(CateID: number, Category: Partial<category>): Promise<category>;
    remove(CateID: number): Promise<void>;
}
