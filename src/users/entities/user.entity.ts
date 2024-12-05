import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    fullname:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    role:string

}
