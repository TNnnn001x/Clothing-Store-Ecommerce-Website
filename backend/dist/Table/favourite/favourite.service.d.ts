import { Repository } from 'typeorm';
import { favourite } from './favourite.entity';
export declare class FavouriteService {
    private favouriteRepository;
    constructor(favouriteRepository: Repository<favourite>);
    findall(): Promise<favourite[]>;
    findOne(FavID: number): Promise<favourite>;
    create(Favourite: favourite): Promise<favourite>;
    update(FavID: number, Favourite: Partial<favourite>): Promise<favourite>;
    remove(FavID: number): Promise<void>;
}
