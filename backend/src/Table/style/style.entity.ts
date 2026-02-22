import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { filtercategory } from "../filtercategory/filtercategory.entity";

@Entity()
export class style{
    @PrimaryGeneratedColumn()
    StyleID: number;

    @Column({type: "varchar", length: 50})
    StyleName: string;

    @OneToMany(() => filtercategory, (filcate) => filcate.Style)
    Filter: filtercategory[];
}