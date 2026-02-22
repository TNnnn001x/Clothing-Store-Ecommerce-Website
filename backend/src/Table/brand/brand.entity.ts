import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { filtercategory } from "../filtercategory/filtercategory.entity";

@Entity()
export class brand{
    @PrimaryGeneratedColumn()
    BrandID: number;

    @Column({type: "varchar", length: 50})
    BrandName: string;

    @OneToMany(() => filtercategory, (filcate) => filcate.Brand)
    Filter: filtercategory[];
}