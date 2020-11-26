import {
    Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany, ManyToOne,
} from "typeorm"
import { Post } from "./Post";


@Entity()
export class PostMeta {
    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @ManyToOne(() => Post, (post: Post) => post.postMetas)
    post?: Post;
}