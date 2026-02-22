import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { product } from "../product/product.entity";
import { favourite } from "../favourite/favourite.entity";

@Entity()
export class favouritedetail {
    @PrimaryGeneratedColumn()
    FavDetailID: number;

    @ManyToOne(() => favourite, (f) => f.FavouriteDetails)
    @JoinColumn({ name: "FavID"})
    Favourites: favourite;

    @RelationId((FavouriteDetail: favouritedetail) => FavouriteDetail.Favourites)
    FavID: number;

    @ManyToOne(() => product, (p) => p.FavouriteDetails)
    @JoinColumn({ name: "ProdID" })
    Products: product;

    @RelationId((FavouriteDetail: favouritedetail) => FavouriteDetail.Products)
    ProdID: number;
}