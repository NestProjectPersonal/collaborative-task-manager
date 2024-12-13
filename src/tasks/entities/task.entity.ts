import { TaskPriority, TaskStatus } from "src/enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tasks')
export class Tasks {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    description:string

    @Column({
        default:'pending'
    })
    status:TaskStatus

    @Column()
    priority:TaskPriority

    @CreateDateColumn()
    createdAt:Date
    
    @UpdateDateColumn()
    updatedAt:Date
    
    //@Column()
    //userId:string

}
