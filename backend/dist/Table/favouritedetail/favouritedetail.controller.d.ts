import { FavouritedetailService } from './favouritedetail.service';
import { favouritedetail } from './favouritedetail.entity';
export declare class FavouritedetailController {
    private readonly favouritedetailService;
    constructor(favouritedetailService: FavouritedetailService);
    findAll(): Promise<favouritedetail[]>;
    findOne(id: string): Promise<favouritedetail>;
    create(Favouritedetail: favouritedetail): Promise<favouritedetail>;
    update(id: string, Favouritedetail: favouritedetail): Promise<favouritedetail>;
    remove(id: string): Promise<void>;
}
