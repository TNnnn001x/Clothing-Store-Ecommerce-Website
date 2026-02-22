import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { filtercategory } from "../filtercategory/filtercategory.entity";

@Entity()
export class type{
    @PrimaryGeneratedColumn()
    TypeID: number;

    @Column({type: "varchar", length: 50})
    TypeName: string;

    @OneToMany(() => filtercategory, (filcate) => filcate.Type)
    Filter: filtercategory[];
}