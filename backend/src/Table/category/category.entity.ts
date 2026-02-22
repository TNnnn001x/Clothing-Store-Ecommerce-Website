import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { filtercategory } from "../filtercategory/filtercategory.entity";

@Entity()
export class category{
    @PrimaryGeneratedColumn()
    CateID: number;

    @Column({type: "varchar", length: 50})
    CateName: string;

    @OneToMany(() => filtercategory, (filcate) => filcate.Category)
    Filter: filtercategory[];
}