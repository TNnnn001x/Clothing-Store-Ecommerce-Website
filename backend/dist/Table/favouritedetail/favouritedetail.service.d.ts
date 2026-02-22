import { Repository } from 'typeorm';
import { favouritedetail } from './favouritedetail.entity';
export declare class FavouritedetailService {
    private favouritedetailRepository;
    constructor(favouritedetailRepository: Repository<favouritedetail>);
    findall(): Promise<favouritedetail[]>;
    findOne(FavDetailID: number): Promise<favouritedetail>;
    create(Favouritedetail: favouritedetail): Promise<favouritedetail>;
    update(FavDetailID: number, Favouritedetail: Partial<favouritedetail>): Promise<favouritedetail>;
    remove(FavDetailID: number): Promise<void>;
}
