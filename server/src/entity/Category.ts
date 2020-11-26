import {
    Entity, PrimaryGeneratedColumn, Column
} from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 75
    })
    parentId?: string;

    @Column({
        type: "varchar",
        length: 75
    })
    title?: string;

    @Column({
        type: "varchar",
        length: 100
    })
    metaTitle?: string;

    @Column({
        type: "varchar",
        length: 100
    })
    slug?: string;

    @Column({
        type: "text"
    })
    content?: string
}