import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from "typeorm"
import { User } from "./User";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title?: string;

    @Column()
    description?: string;

    @Column()
    size?: string;

    @ManyToOne(() => User, (user: User) => user.photos)
    user?: User;
}