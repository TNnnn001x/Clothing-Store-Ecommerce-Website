import { TypeService } from './type.service';
import { type } from './type.entity';
export declare class TypeController {
    private readonly typeService;
    constructor(typeService: TypeService);
    findAll(): Promise<type[]>;
    findOne(id: string): Promise<type>;
    create(Type: type): Promise<type>;
    update(id: string, Type: type): Promise<type>;
    remove(id: string): Promise<void>;
}
