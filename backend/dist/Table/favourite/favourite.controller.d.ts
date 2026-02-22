import { FavouriteService } from './favourite.service';
import { favourite } from './favourite.entity';
export declare class FavouriteController {
    private readonly favouriteService;
    constructor(favouriteService: FavouriteService);
    findAll(): Promise<favourite[]>;
    findOne(id: string): Promise<favourite>;
    create(Favourite: favourite): Promise<favourite>;
    update(id: string, Favourite: favourite): Promise<favourite>;
    remove(id: string): Promise<void>;
}
