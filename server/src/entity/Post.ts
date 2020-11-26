import {
    Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne, OneToMany
} from "typeorm";
import { Category } from "./Category";
import { Comment } from "./Comment";
import { PostMeta } from "./PostMeta";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @ManyToOne(() => User, (user: User) => user.posts)
    user?: string;

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
        type: "tinytext",
    })
    summary?: string;

    @Column({
        default: 0
    })
    published?: boolean;

    @Column({
        type: "datetime"
    })
    createdAt?: Date;

    @Column({
        type: "datetime"
    })
    updatedAt?: Date;

    @Column({
        type: "datetime"
    })
    publishedAt?: Date;

    @Column({
        type: "text"
    })
    content?: string

    @ManyToMany(type => Category, {
        cascade: true
    })
    @JoinTable({
        name: "post_category"
    })
    categories?: Category[];

    @ManyToMany(type => Tag, {
        cascade: true,
    })
    @JoinTable({
        name: "post_tag"
    })
    tags?: Tag[];

    @OneToMany(() => PostMeta, (postMeta: PostMeta) => postMeta.post)
    postMetas?: string;

    @OneToMany(() => Comment, (cmt: Comment) => cmt.post)
    comments?: Post
}