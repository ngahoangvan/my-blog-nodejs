import { userInfo } from "os";
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from "typeorm"
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @ManyToOne(() => User, (user: User) => user.comments)
    user?: User

    @ManyToOne(() => Post, (post: Post) => post.comments)
    post?: Post

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

}