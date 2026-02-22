import { Repository } from 'typeorm';
import { type } from './type.entity';
export declare class TypeService {
    private typeRepository;
    constructor(typeRepository: Repository<type>);
    findall(): Promise<type[]>;
    findOne(TypeID: number): Promise<type>;
    create(Type: type): Promise<type>;
    update(TypeID: number, Type: Partial<type>): Promise<type>;
    remove(TypeID: number): Promise<void>;
}
