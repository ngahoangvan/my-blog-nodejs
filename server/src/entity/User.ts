import {
    Entity, PrimaryGeneratedColumn, Column,
    OneToMany, Unique
} from "typeorm"
import { Comment } from "./Comment";
import { Post } from "./Post";
import { Photo } from "./UserPhoto";
import bcrypt from "bcryptjs"
import {
    Contains, IsNotEmpty, IsInt,
    Length, IsEmail, IsFQDN,
    IsDate, Min, Max
} from "class-validator";


@Entity()
@Unique(["username", "email", "mobile"])
export class User {

    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @Column({
        type: "varchar",
        length: 50,
        default: "User",
    })
    firstName?: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
    })
    middleName?: string;

    @Column({
        type: "varchar",
        length: 50,
        default: "Account",
    })
    lastName?: string;

    @Column({
        type: "varchar",
        length: 15,
    })
    mobile?: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    email?: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    @Length(8, 20)
    username!: string;

    @Column({
        type: "varchar",
        length: 70,
    })
    @Length(8, 20)
    password!: string;

    @Column({
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP'
    })
    registerAt?: Date;

    @Column({
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP'
    })
    lastLogin?: Date;

    @Column({
        type: "tinytext",
        nullable: true
    })
    intro?: string;

    @Column({
        type: "text",
        nullable: true
    })
    profile?: string;

    @OneToMany(() => Photo, (photo: Photo) => photo.user)
    photos?: Photo

    @OneToMany(() => Post, (post: Post) => post.user)
    posts?: Post

    @OneToMany(() => Comment, (cmt: Comment) => cmt.user)
    comments?: Post

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}