import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, RelationId, OneToMany } from "typeorm";
import { product } from "../product/product.entity";
import { account } from "../account/account.entity";
import { favouritedetail } from "../favouritedetail/favouritedetail.entity";

@Entity()
export class favourite{
    @PrimaryGeneratedColumn()
    FavID: number;

    @OneToMany(() => favouritedetail, (Favd) => Favd.Favourites)
    FavouriteDetails: favouritedetail[];

    @ManyToOne(() => account, (a) => a.Favourites)
    @JoinColumn({ name: "AccID"})
    Accounts: account;

    @RelationId((Favourite: favourite) => Favourite.Accounts)
    AccID: number;
}